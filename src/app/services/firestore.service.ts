import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  addUserToFirestore(uid: string, userData: any) {
    const { email, username } = userData;
  
    return this.firestore.collection('users').doc(uid).set({
      email,
      username
    });
  }

  createWishlistForUser(userId: string) {
    const userRef = this.firestore.collection('users').doc(userId);

    // Create the "wishlist" subcollection within the user's document
    userRef.collection('wishlist');
  }
}
