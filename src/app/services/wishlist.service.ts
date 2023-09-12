import { Injectable } from '@angular/core';
import { Products } from '../shared/products';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { switchMap, map } from 'rxjs/operators';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  //private wishlistSubject = new BehaviorSubject<Products[]>([]);
  //wishlist$ = this.wishlistSubject.asObservable();

  constructor(private firestore: AngularFirestore, private authService: AuthService, private productService: ProductsService) { }


  addToWishlist(product: Products): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.authService.getAuthState().subscribe((user) => {
        if (user) {
          const userId = user.uid;
          const userDocRef = this.firestore.collection('users').doc(userId);

          userDocRef.get().subscribe((doc) => {
            if (doc.exists) {
              const data = doc.data() as { wishlist?: string[] };
              const currentWishlist = data.wishlist || [];

              if (!currentWishlist.includes(product.id)) {
                currentWishlist.push(product.id);

                userDocRef.update({ wishlist: currentWishlist })
                  .then(() => {
                    console.log('Product added to wishlist successfully.');
                    observer.next(true);
                    observer.complete();
                  })
                  .catch((error) => {
                    console.error('Error adding product to wishlist:', error);
                    observer.next(false);
                    observer.complete();
                  });
              } else {
                // Remove the product ID from the wishlist
                const index = currentWishlist.indexOf(product.id);
                if (index > -1) {
                  currentWishlist.splice(index, 1);
                }
                userDocRef.update({ wishlist: currentWishlist })
                  .then(() => {
                    console.log('Product removed from wishlist successfully.');
                    observer.next(false); // Indicate that the product was removed
                    observer.complete();
                  })
                  .catch((error) => {
                    console.error('Error removing product from wishlist:', error);
                    observer.next(false);
                    observer.complete();
                  });
              }
            } else {
              console.log('User document not found.');
              observer.next(false);
              observer.complete();
            }
          });
        } else {
          console.log('User is not authenticated. Please log in to add to your wishlist.');
          observer.next(false);
          observer.complete();
        }
      });
    });
  }



  getUserWishlistProducts(): Observable<Products[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      }),
      switchMap((userData: any) => {
        if (userData?.wishlist) {
          const productIds = userData.wishlist;

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

