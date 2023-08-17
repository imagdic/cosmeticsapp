import { Injectable } from '@angular/core';
import { Wishlist } from '../shared/wishlist';
import { Products } from '../shared/products';
import { WishlistItem } from '../shared/wishlistItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Products[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  addToWishlist(product: Products) {
    const currentWishlist = this.wishlistSubject.value;
    this.wishlistSubject.next([...currentWishlist, product]);
  }

  removeFromWishlist(product: Products) {
    const currentWishlist = this.wishlistSubject.value;
    const updatedWishlist = currentWishlist.filter(p => p.id !== product.id);
    this.wishlistSubject.next(updatedWishlist);
  }
}
