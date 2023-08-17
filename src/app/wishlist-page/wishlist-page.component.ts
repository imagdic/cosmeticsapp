import { Component } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { Products } from '../shared/products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent {
  wishlist$: Observable<Products[]>; // Pretpostavljamo da koristite Observable

  constructor(private wishlistService: WishlistService) {
    this.wishlist$ = this.wishlistService.wishlist$;
  }

  removeFromWishlist(product: Products) {
    this.wishlistService.removeFromWishlist(product);
  }
}
