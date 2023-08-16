import { Injectable } from '@angular/core';
import { Wishlist } from '../shared/wishlist';
import { Products } from '../shared/products';
import { WishlistItem } from '../shared/wishlistItem';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Wishlist = new Wishlist();

  addToWishlist(product:Products):void{
    let wishlistItem = this.wishlist.items.find(item => item.product.id === product.id)
    this.wishlist.items.push(new WishlistItem(product));
  }
  removeFromCart(productId:number):void{
    this.wishlist.items = this.wishlist.items.filter(item => item.product.id! != productId)
  }

  getWishlist(): Wishlist{
    return this.wishlist;
  }
}
