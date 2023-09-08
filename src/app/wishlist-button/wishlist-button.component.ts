import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { WishlistService } from "../services/wishlist.service";
import { Products } from "../shared/products";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrls: ['./wishlist-button.component.scss']
})
export class WishlistButtonComponent implements OnInit {
  @Input() product: Products | undefined;
  isFavorite: boolean = false;
  isDisabled: boolean = false;

  constructor(private authService: AuthService, private wishlistService: WishlistService, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.checkIfProductIsInWishlist();
  }

  addToWishlist(product: Products) {
    this.authService.getAuthState().subscribe((user) => {
      if (user) {
        this.wishlistService.addToWishlist(product).subscribe(isAdded => {
          this.isFavorite = isAdded;
        });
      } else {
        alert("Please log in to add to wishlist");
      }
    });
  }

  private checkIfProductIsInWishlist(): void {
    if (this.product) {
      this.authService.getAuthState().subscribe((user) => {
        if (user) {
          const userId = user.uid;
          const userDocRef = this.db.collection('users').doc(userId);
          userDocRef.get().subscribe((doc) => {
            if (doc.exists) {
              const data = doc.data() as { wishlist?: string[] };
              const currentWishlist = data.wishlist || [];
              this.isFavorite = currentWishlist.includes(this.product!.id);
            }
          });
        }
      });
    }
  }

}
