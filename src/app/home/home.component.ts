import { Component, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../shared/products';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RatingService } from '../services/rating.service';
import { RatingComponent } from '../rating/rating.component';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;
  products: Products[] = [];
  rating!: string;
  first: number = 0;
  displayedProducts: Products[] = [];
  averageRatings: { [key: string]: number | null } = {};


  rows: number = 10;

  constructor(private productsService: ProductsService, private ratingService: RatingService,
    private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      this.updateDisplayedProducts();
      products.forEach(product => {
        if (product.id) {
          this.ratingService.getAverageProductRating(product.id).subscribe(avgRating => {
            this.averageRatings[product.id] = avgRating;
          });
        }
      });
    });
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/products', productId]);
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

  onPageChange(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts() {
    this.displayedProducts = this.products.slice(this.first, this.first + this.rows);
  }

}
