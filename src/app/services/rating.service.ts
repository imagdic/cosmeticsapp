import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  constructor(private firestore: AngularFirestore, private authService: AuthService) {}

  addRating(productId: string, rating: number): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        const userId = user.uid;

        // Check if the user has already rated the product
        this.hasUserRatedProduct(userId, productId).subscribe((hasRated) => {
          if (!hasRated) {
            // User has not rated the product, proceed to add the rating
            this.firestore.collection('ratings').add({
              userId: this.firestore.doc(`users/${userId}`).ref,
              productId: this.firestore.doc(`products/${productId}`).ref,
              rating: rating,
              timestamp: new Date()
            });
          } else {
            console.log('User has already rated this product.');
          }
        });
      }
    });
  }

  private hasUserRatedProduct(userId: string, productId: string) {
    return this.firestore
      .collection('ratings', (ref) => {
        return ref
          .where('userId', '==', this.firestore.doc(`users/${userId}`).ref)
          .where('productId', '==', this.firestore.doc(`products/${productId}`).ref);
      })
      .valueChanges()
      .pipe(
        tap((ratings) => {
          console.log('Ratings:', ratings);
        }),
        map((ratings) => {
          return ratings.length > 0;
        })
      );
  }
  

  calculateAverageRating(productId: string) {
    return this.firestore
      .collection('ratings', (ref) => {
        return ref.where('product', '==', this.firestore.doc(`products/${productId}`).ref);
      })
      .valueChanges()
      .pipe(
        map((ratings: any[]) => {
          if (ratings.length === 0) {
            return 0; // No ratings, return 0 as the average rating
          }
          const totalRatings = ratings.length;
          const sumRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
          const averageRating = sumRatings / totalRatings;
          return averageRating;
        })
      );
  }
  
}
