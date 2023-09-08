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
      });
    }

  viewProductDetails(productId: string) {
    this.router.navigate(['/products', productId]);
  }

  handleRatingChange(productId: string, newRatingValue: number): void {
    console.log(`Product with ID: ${productId} received a new rating of ${newRatingValue}`);
    this.ratingService.getAverageProductRating(productId).subscribe(avgRating => {
        this.averageRatings[productId] = avgRating;
    });
}

}
