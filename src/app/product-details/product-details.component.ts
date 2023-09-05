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
  averageRating: number | null = null;

  
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, 
    private ratingService: RatingService, private wishlistService: WishlistService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
        const productId = params['id'];
        if (productId) {
            this.productService.getProductById(productId).subscribe((product) => {
                this.product = product;

                // After setting the product, get its ratings
                this.ratingService.getProductRating(productId).subscribe(ratings => {
                    if (ratings && ratings.length > 0) {
                        const totalRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
                        this.averageRating = totalRatings / ratings.length;
                    } else {
                        this.averageRating = null;
                    }
                });
            });
        }
    });
} 

rateProduct(productId: string, ratingValue: number): void {
  this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (!isAuthenticated) {
          alert('Please log in to leave a review!');
          return;
      }
      this.ratingService.rateProduct(productId, ratingValue);
  });
}
  
}
