import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private authService: AuthService,
    private ratingService: RatingService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.fetchProductsByCategory(this.categoryName);
    });
  }

  fetchProductsByCategory(category: string | null) {
    if(category) {
      this.productsService.getProductsByCategory(category).subscribe(data => {
        this.products = data;
      });
    }
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