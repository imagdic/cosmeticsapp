import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private fireauth: AngularFireAuth, private router: Router){}

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
    register(user: { email: string, password: string }): Promise<void> {
        return this.fireauth.createUserWithEmailAndPassword(user.email, user.password)
          .then(() => {
            alert('Registration successful');
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

    //provjera autentifikacije
    isAuthenticated(email: string, password: string){
        this.isAuthenticated;
    }
}