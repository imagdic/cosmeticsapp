import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from '../shared/products';
import { User } from 'firebase/auth';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() product!: Products;
  @Output() ratingSubmitted = new EventEmitter<number>();

  user: User | undefined;
  selectedRating: number = 0;

  constructor (private ratingService: RatingService) { }

    submitRating() {
        // Emit the selected rating to the parent component
        this.ratingSubmitted.emit(this.selectedRating);
    }

    onRatingChange(product: Products) {
      if (!this.user) {
        console.log('User is not signed in.');
        return;
      }
  
      const userId = this.user.uid; 
      const productId = product.id;
      const newRating = product.rating;
  
      // Update the user's rating for the product
      this.ratingService.addRating(userId, productId, newRating);
  
      // Calculate and update the average rating for the product (optional)
      this.ratingService.calculateAverageRating(productId);
    }
}
