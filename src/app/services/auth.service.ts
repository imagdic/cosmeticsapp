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
    login(email: string, password: string){
        this.fireauth.signInWithEmailAndPassword(email, password).then( () => {
            localStorage.setItem('token', 'true');
            this.router.navigate(['/'])
        }, err => {
            alert('Something went wrong');
            this.router.navigate(['/login']);
        })
    }

    //register method
    register(email: string, password: string){
        this.fireauth.createUserWithEmailAndPassword(email, password).then( () => {
            alert('Registration successful')
            this.router.navigate(['/login']);
        }, err => {
            alert('Something went wrong');
            this.router.navigate(['/register']);
        })
    }

    //sign out
    logout(){
        this.fireauth.signOut().then( () => {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
        }, err => {
            alert(err.message);
        })
    }

    //provjera autentifikacije
    isAuthenticated(email: string, password: string){
        this.isAuthenticated;
    }
}