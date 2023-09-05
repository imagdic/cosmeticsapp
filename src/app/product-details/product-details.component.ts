import { Component, OnInit } from '@angular/core';
import { Products } from '../shared/products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product: Products | undefined;
  
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, 
    private ratingService: RatingService, private wishlistService: WishlistService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.productService.getProductById(productId).subscribe((product) => {
          this.product = product;
        });
      }
    });
}
  

  rateProduct(productId: string, ratingValue: number): void {
    console.log('Rate Product Method called with:', productId, ratingValue);
    this.ratingService.rateProduct(productId, ratingValue);
  }
  
}
