import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() productId!: string;
  @Output() ratingChange = new EventEmitter<number>();

  averageRating: number | null = null;
  userRating: number | null = null;
  isAuthenticated: boolean = false;

  constructor(private ratingService: RatingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchAverageRating();

    this.authService.getAuthState().subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  fetchAverageRating(): void {
    this.ratingService.getAverageProductRating(this.productId).subscribe(average => {
      this.averageRating = average;
    }, error => {
      console.error("Error fetching average rating:", error);
    });
  }

  onRatingChanged(event: any): void {
    const newRating = event.value;
    this.userRating = newRating;

    this.authService.getAuthState().subscribe(user => {
      if (user) {
        this.ratingService.rateProduct(this.productId, newRating);
        alert('Thank you for rating this!');
      } else {
      }
    });
  }

}