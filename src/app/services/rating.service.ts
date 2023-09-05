import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  rateProduct(productId: string, ratingValue: number): void {
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
  

  getRatingsForProduct(productId: string): Observable<any[]> {
    return this.firestore.collection('ratings', ref => ref.where('product', '==', productId)).valueChanges();
  }
  

}
