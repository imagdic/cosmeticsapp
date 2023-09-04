import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  constructor(private firestore: AngularFirestore) {}

  addRating(userId: string, productId: string, rating: number) {
    // Create a new rating document in the "ratings" collection
    this.firestore.collection('ratings').add({
      userId: this.firestore.doc(`users/${userId}`).ref,
      productId: this.firestore.doc(`products/${productId}`).ref,
      rating: rating,
      timestamp: new Date()
    });
  }

  calculateAverageRating(productId: string) {
    // Query the "ratings" collection for all ratings of the product
    const ratingsQuery = this.firestore.collection('ratings', (ref) =>
      ref.where('productId', '==', this.firestore.doc(`products/${productId}`).ref)
    );

    ratingsQuery.valueChanges().subscribe((ratings: any[]) => {
      const totalRatings = ratings.length;
      const sumRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
      const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

      // Update the product document with the new average rating
      this.firestore.doc(`products/${productId}`).update({
        rating: averageRating
      });
    });
  }
}
