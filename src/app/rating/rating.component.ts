import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from '../shared/products';
import { User } from 'firebase/auth';
import { RatingService } from '../services/rating.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() product!: Products;
  @Output() ratingSubmitted = new EventEmitter<number>();

  selectedRating: number = 0;
  user: any;
  userEmail: string | null = null;

  constructor (private ratingService: RatingService, private authService: AuthService) { }

  submitRating() {
    // Emit the selected rating to the parent component
    this.ratingSubmitted.emit(this.selectedRating);
  }

  onRatingChange(product: Products) {
    console.log('User in RatingComponent:', this.user);
    if (!this.user) {
      console.log('User is not signed in.');
      return;
    }

    const userId = this.user.uid;
    const productId = product.id;
    const newRating = this.selectedRating;
    console.log('userId: '+ userId + 'productId: ', productId + 'newRating: ' + newRating);

    // Update the user's rating for the product
    this.ratingService.addRating(userId, productId, newRating);

    this.ratingService.calculateAverageRating(productId);
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      if (authenticated) {
        this.authService.getCurrentUser().subscribe((user) => {
          this.user = user;
          this.userEmail = user ? user.email : null;

        });
      } else {
        this.user = null;
        this.userEmail = null;
      }
    });
  }
}
