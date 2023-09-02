import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { FirestoreService } from './firestore.service';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private fireauth: AngularFireAuth, private router: Router, private firestoreService: FirestoreService){}

    //login with Google
    loginWithGoogle(){
        return this.fireauth.signInWithPopup(new GoogleAuthProvider());
    }

    //login method
    login(user: { email: string, password: string }): Promise<void> {
        return this.fireauth.signInWithEmailAndPassword(user.email, user.password)
          .then(() => {
            localStorage.setItem('token', 'true');
          });
      }

    //register method
    register(user: { email: string; password: string }): Promise<void> {
        return this.fireauth
          .createUserWithEmailAndPassword(user.email, user.password)
          .then((userCredential) => {
            // Check if userCredential.user is not null
            if (userCredential.user) {
              alert('Registration successful');
              const user = userCredential.user;
              const userData = {
                email: user.email,
                // Add any additional user data you want to store in Firestore here
              };
              this.firestoreService.addUserToFirestore(user.uid, userData);
            } else {
              // Handle the case where userCredential.user is null
              console.error('User is null after registration');
            }
          })
          .catch((error) => {
            console.error('Error during registration: ', error);
          });
      }

    //sign out
    logout(){
        this.fireauth.signOut().then( () => {
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
            return !!user; // Returns true if the user is authenticated, false otherwise
          })
        );
      }

      getCurrentUser() {
        return this.fireauth.authState;
      }
}