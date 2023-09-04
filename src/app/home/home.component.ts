import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../shared/products';
import { WishlistService } from '../services/wishlist.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any;
  products: Products[]=[];

  constructor (private productsService: ProductsService, private wishlistService: WishlistService, private authService: AuthService,
    private db: AngularFirestore,  private firestoreService: FirestoreService, private router: Router) {  }

  addToWishlist(product: Products) {
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        const userId = user.uid;
  
        const wishlistItem = {
          productId: product.id.toString(), 
          productName: product.name,
        };
  
        const wishlistDocRef = this.db.collection('users').doc(userId).collection('wishlist').doc(product.id.toString());
  
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
  

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        // display the heart icon
      } else {
        // User is not authenticated, handle this case, e.g., prompt for login
      }
    });
    
     this.productsService.getProducts().subscribe((data: Products[]) => {
      this.products = data;
    });
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/products', productId]);
  }
  

}
