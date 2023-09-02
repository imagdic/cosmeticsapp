import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../shared/products';
import { WishlistService } from '../services/wishlist.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any;
  products: Products[]=[];
  rating: number = 0;
  favorite: boolean = false;
  checked: boolean = false;

  constructor (private productsService: ProductsService, private wishlistService: WishlistService, private authService: AuthService,
    private db: AngularFirestore,  private firestoreService: FirestoreService) {

    this.products.forEach(product => {
      product.rating = this.rating; // Inicijalna ocjena za svaki proizvod
    });
  }

  addToWishlist(product: Products) {
    // Check if the user is authenticated using AuthService
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        const userId = user.uid;
  
        // Define the data you want to add to the wishlist
        const wishlistItem = {
          productId: product.id.toString(), // Convert product.id to a string
          productName: product.name, // Replace with your product's name
          // Add other product details as needed
        };
  
        // Reference to the user's wishlist document in Firestore
        const wishlistDocRef = this.db.collection('users').doc(userId).collection('wishlist').doc(product.id.toString());
  
        // Set the wishlist item data in the document
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
        // User is authenticated, you can proceed with displaying the heart icon
      } else {
        // User is not authenticated, you can handle this case, e.g., prompt for login
      }
    });
    
    //this.products = this.productsService.getProducts();
    //this.loadProducts();
     this.productsService.getProducts().subscribe((data: Products[]) => {
      this.products = data;
      console.log(data);
    });

    
  }

  loadProducts() {
    //this.products = this.productsService.getProducts();
  }

  
  

}
