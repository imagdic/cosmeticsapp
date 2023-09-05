import { Component, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../shared/products';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RatingService } from '../services/rating.service';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:any;
  products: Products[]=[];
  rating!: string;

  constructor (private productsService: ProductsService, private ratingService: RatingService, 
    private authService: AuthService, private router: Router) {  }
  

  ngOnInit(): void {
     this.productsService.getProducts().subscribe((data: Products[]) => {
      this.products = data;
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

}
