import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { Products } from '../shared/products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {
  wishlistProducts: Products[] = [];

  constructor(private wishlistService: WishlistService) { }
  ngOnInit() {
    this.wishlistService.getUserWishlistProducts().subscribe(products => {
      this.wishlistProducts = products;
    })
  }

}
