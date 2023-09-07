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


  rows: number = 10;

  constructor(private productsService: ProductsService, private ratingService: RatingService,
    private authService: AuthService, private router: Router) { }


    ngOnInit(): void {
      this.productsService.getProducts().subscribe((data: Products[]) => {
        this.products = data;
        this.updateDisplayedProducts(); // Call this whenever you update the products array
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

  onPageChange(event: any) { // temporarily change type to any
    console.log(event); // log the event object to inspect its structure
    this.first = event.first;
    this.rows = event.rows;
    this.updateDisplayedProducts();
  }

updateDisplayedProducts() {
  this.displayedProducts = this.products.slice(this.first, this.first + this.rows);
}

}
