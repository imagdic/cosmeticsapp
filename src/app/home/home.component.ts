import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../shared/products';
import { WishlistService } from '../services/wishlist.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Products[]=[];
  rating: number = 0;
  favorite: boolean = false;
  checked: boolean = false;

  constructor (private productsService: ProductsService, private wishlistService: WishlistService, private authService: AuthService) {
    this.products.forEach(product => {
      product.rating = this.rating; // Inicijalna ocjena za svaki proizvod
    });
  }

  addToWishlist(product: Products) {
    this.wishlistService.addToWishlist(product);
  }
  

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
    this.loadProducts();
    
  }

  loadProducts() {
    this.products = this.productsService.getProducts();
  }

  logout() {
    this.authService.logout();
  }
  

}
