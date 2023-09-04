import { Component, Input } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { WishlistService } from "../services/wishlist.service";
import { Products } from "../shared/products";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrls: ['./wishlist-button.component.scss']
})
export class WishlistButtonComponent {
  @Input() product: Products | undefined;
  isFavorite: boolean = false;
  isDisabled: boolean = false;


  constructor(private authService: AuthService, private wishlistService: WishlistService, private db: AngularFirestore) {}

 addToWishlist(product: Products) {
  this.authService.getAuthState().subscribe((user) => {
    if (user) {
      const userId = user.uid;
  
      const userDocRef = this.db.collection('users').doc(userId);
  
      // Get the current wishlist array from the user document
      userDocRef.get().subscribe((doc) => {
        if (doc.exists) {
          const data = doc.data() as { wishlist?: string[] };
  
          const currentWishlist = data.wishlist || [];
  
          // Add the product ID to the wishlist if it's not already there
          if (!currentWishlist.includes(product.id)) {
            currentWishlist.push(product.id);
  
            // Update the user's wishlist in Firestore
            userDocRef.update({ wishlist: currentWishlist })
              .then(() => {
                console.log('Product added to wishlist successfully.');
                this.isFavorite = true;
              })
              .catch((error) => {
                console.error('Error adding product to wishlist:', error);
              });
          } else {
            console.log('Product is already in the wishlist.');
          }
        } else {
          console.log('User document not found.');
        }
      });
    } else {
      console.log('User is not authenticated. Please log in to add to your wishlist.');
    }
  });
}



}
