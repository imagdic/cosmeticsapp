import { Injectable } from '@angular/core';
import { Wishlist } from '../shared/wishlist';
import { Products } from '../shared/products';
import { WishlistItem } from '../shared/wishlistItem';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Products[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor(private firestore: AngularFirestore, private authService: AuthService) {}


  addToWishlist(product: Products) {
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        const userId = user.uid;
  
        const productRef = this.firestore.collection('products').doc(product.id); // Reference to the product
  
        const wishlistItem = {
          productRef: productRef, // Store the product reference
          productName: product.name,
        };
  
        const wishlistDocRef = this.firestore.collection('users').doc(userId).collection('wishlist').doc(product.id.toString());
  
        wishlistDocRef.set(wishlistItem)
          .then(() => {
            console.log('Product added to wishlist successfully.');
          })
          .catch((error) => {
            console.error('Error adding product to wishlist:', error);
          });
      } else {
        console.log('User is not authenticated. Please log in to add to your wishlist.');
      }
    });
  }

  removeFromWishlist(product: Products) {
    const currentWishlist = this.wishlistSubject.value;
    const updatedWishlist = currentWishlist.filter(p => p.id !== product.id);
    this.wishlistSubject.next(updatedWishlist);
  }

  

}
