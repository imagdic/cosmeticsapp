import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  constructor() {}

  onRatingChanged(event: any): void {
    console.log('onRatingChanged called with event:', event);
    this.rating = event.value ? event.value : event;
    console.log('Emitting rating value:', this.rating);
    this.ratingChange.emit(this.rating);
}

  ngOnInit(): void { };
}
