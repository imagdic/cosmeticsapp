import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  addUserToFirestore(uid: string, userData: any) {
    const { email } = userData; 
  
    return this.firestore.collection('users').doc(uid).set({
      email
    });
  }

}
