import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Products } from '../shared/products';
import { ProductsService } from '../services/products.service';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number | undefined;
  @Output() ratingChange = new EventEmitter<number>();

  constructor(private authService: AuthService, private productService: ProductsService, private ratingService: RatingService) {}

  ngOnInit(): void {  };


  rateProduct(event: any) {
    const productId = 'your-product-id';
    const rating = event.value; 

    this.ratingService.addRating(productId, rating);
  }


}