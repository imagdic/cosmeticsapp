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