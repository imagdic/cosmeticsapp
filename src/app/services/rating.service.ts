import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  rateProduct(productId: string, ratingValue: number): void {
    console.log(`Rating product with ID: ${productId} with value: ${ratingValue}`);
    this.authService.getCurrentUser().subscribe(user => {
      if(user && productId && (ratingValue !== undefined)) {
        const userId = user.uid;
        const ratingObj = {
          user: userId,
          product: productId,
          rating: ratingValue,
          timestamp: new Date() 
        };
        this.firestore.collection('ratings').add(ratingObj)
        .then(() => {
          console.log("Rating added successfully!");
        })
        .catch((error) => {
          console.error("Error adding rating: ", error);
        });
      } else {
        console.error("Invalid data: ", { user, productId, ratingValue });
      }
    });
  }
  

  getProductRating(productId: string): Observable<any[]> {
    return this.firestore.collection('ratings', ref => ref.where('product', '==', productId))
    .valueChanges()
    .pipe(
      tap(ratings => {
       // console.log(`Fetched ratings for product with ID: ${productId}`, ratings);
      })
    );
  }

  getAverageProductRating(productId: string): Observable<number | null> {
    return this.getProductRating(productId).pipe(
      map(ratings => {
        if (ratings && ratings.length > 0) {
          const totalRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
          const average = totalRatings / ratings.length;
          return average;
        } 
        return null;
      })
    );
  }
  

  

}
