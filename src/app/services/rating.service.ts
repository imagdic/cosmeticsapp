import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) {}

  rateProduct(productId: string, ratingValue: number): void {
    console.log('RateProduct method called with product ID:', productId, 'and rating:', ratingValue);
    
    this.authService.getCurrentUser().subscribe(user => {
      console.log('Fetched user:', user);
      
      if(user) {
        const userId = user.uid;
        
        const ratingObj = {
          user: userId,
          product: productId,
          rating: ratingValue,
          timestamp: new Date()
        };
        console.log('Attempting to add the following rating object:', ratingObj);

        this.firestore.collection('ratings').add(ratingObj)
        .then(() => {
          console.log("Rating added successfully!");
        })
        .catch((error) => {
          console.error("Error adding rating:", error);
        });
      } else {
        console.error("No user is currently logged in");
      }
    });
}
}
