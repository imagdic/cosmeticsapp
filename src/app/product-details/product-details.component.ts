import { Component, OnInit } from '@angular/core';
import { Products } from '../shared/products';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';
import { RatingService } from '../services/rating.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product: Products | undefined;
  averageRatings: { [key: string]: number | null } = {};

  
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, 
    private ratingService: RatingService, private wishlistService: WishlistService, private authService: AuthService) {
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

  handleRatingChange(productId: string, newRatingValue: number): void {
    console.log(`Product with ID: ${productId} received a new rating of ${newRatingValue}`);
    this.ratingService.getAverageProductRating(productId).subscribe(avgRating => {
        this.averageRatings[productId] = avgRating;
    });
}
  
}
