import { Injectable } from '@angular/core';
import { Products } from '../shared/products';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { RatingService } from './rating.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Products[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor(private firestore: AngularFirestore, private authService: AuthService, private productService: ProductsService) {}


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

  getUserWishlistProducts(): Observable<Products[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          // Retrieve wishlist for the authenticated user using user.uid
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      }),
      switchMap((userData: any) => {
        if (userData?.wishlist) {
          const productIds = userData.wishlist;

          // Map over each product ID to get its details.
          const productObservables = productIds.map((productId: string) => {
            return this.productService.getProductById(productId);
          });

          return combineLatest(productObservables) as Observable<Products[]>;
        } else {
          // Return an empty array if no wishlist or not authenticated
          return of([]);
        }
      })
    );
  }
  

}
  
