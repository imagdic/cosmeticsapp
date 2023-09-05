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
    const productId = 'your-product-id'; // Replace with the actual product ID
    const rating = event.value; // The selected rating value from the event

    // Call the addRating method from your RatingService
    this.ratingService.addRating(productId, rating);
  }


  // onStarClick(starValue: number) {
  //   if (!this.user) {
  //     // User is not authenticated, show a message or a popup.
  //     alert('Please log in to leave a review.');
  //     return;
  //   }

  //   if (!this.currentProduct) {
  //     // Handle the case where there's no current product selected.
  //     return;
  //   }

  //   // User is authenticated, allow rating.
  //   this.selectedRating = starValue;
  //   // Emit the rating to the parent component with product information.
  //   this.ratingSubmitted.emit({ productId: this.currentProduct.id, rating: this.selectedRating });
  // }

}