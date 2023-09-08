import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';
import { RatingService } from 'src/app/services/rating.service';
import { Products } from 'src/app/shared/products';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: Products[] = [];
  categoryName: string | null = null;
  averageRatings: { [key: string]: number | null } = {};

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private authService: AuthService,
    private ratingService: RatingService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.fetchProductsByCategory(this.categoryName);
    });
  }


  fetchProductsByCategory(category: string | null) {
    if (category) {
      this.productsService.getProductsByCategory(category).subscribe(data => {
        this.products = data;
        this.products.forEach(product => {
          if (product.id) {
            this.ratingService.getAverageProductRating(product.id).subscribe(avgRating => {
              this.averageRatings[product.id] = avgRating;
            });
          }
        });
      });
    }
  }
  
  
  handleRatingChange(productId: string, newRatingValue: number): void {
    console.log(`Product with ID: ${productId} received a new rating of ${newRatingValue}`);
    this.ratingService.getAverageProductRating(productId).subscribe(avgRating => {
        this.averageRatings[productId] = avgRating;
    });
}

  viewProductDetails(productId: string) {
    this.router.navigate(['/products', productId]);
  }
}