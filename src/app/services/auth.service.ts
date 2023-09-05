import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { FirestoreService } from './firestore.service';
import { map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: any = null;

  constructor(private fireauth: AngularFireAuth, private router: Router, private firestoreService: FirestoreService,
    private firestore: AngularFirestore) { }

  //login with Google
  loginWithGoogle() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider());
  }

  //login method
  login(user: { email: string, password: string }): Promise<void> {
    return this.fireauth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        localStorage.setItem('token', 'true');
      });
  }

  register(user: { email: string; password: string }): Promise<void> {
    return this.fireauth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        if (userCredential.user) {
          alert('Registration successful');
          const user = userCredential.user;
          const userData = {
            email: user.email
          };

          // Add the user to the 'users' collection
          this.firestoreService.addUserToFirestore(user.uid, userData);

          // Create an empty wishlist subcollection for the user
          this.createEmptyWishlist(user.uid);

        } else {
          console.error('User is null after registration');
        }
      })
      .catch((error) => {
        console.error('Error during registration: ', error);
      });
  }

  createEmptyWishlist(userId: string): void {
    const wishlistRef = this.firestore.collection('users').doc(userId).collection('wishlist');
  }


  //sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  getAuthState() {
    return this.fireauth.authState;
  }

  //provjera autentifikacije
  isAuthenticated() {
    return this.fireauth.authState.pipe(
      map((user) => {
        return !!user;
      })
    );
  }

  getCurrentUser() {
    return this.fireauth.authState;
  }
}