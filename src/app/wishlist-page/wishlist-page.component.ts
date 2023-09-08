import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { Products } from '../shared/products';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RatingService } from '../services/rating.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {
  wishlistProducts: Products[] = [];
  averageRatings: { [key: string]: number | null } = {};

  constructor(private wishlistService: WishlistService, private authService: AuthService, private ratingService: RatingService,
    private router: Router) { }
    ngOnInit() {
      this.wishlistService.getUserWishlistProducts().subscribe(products => {
        this.wishlistProducts = products;
        products.forEach(product => {
          this.ratingService.getAverageProductRating(product.id).subscribe(avgRating => {
            this.averageRatings[product.id] = avgRating;
          });
        });
      });
    }
    

  rateProduct(productId: string, ratingValue: number): void {
    console.log('Rating product with ID:', productId);
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        alert('Please log in to leave a review!');
        return;
      }
      this.ratingService.rateProduct(productId, ratingValue);
      console.log(productId)
    });
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/products', productId]);
  }

}
