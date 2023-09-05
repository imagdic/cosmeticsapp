import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  value: number = 0;
  @Output() ratingClicked = new EventEmitter<number>();
  
  constructor() {}

  ngOnInit(): void {  };

  onRatingClick(event: any) {
    this.value = event.value;

    this.ratingClicked.emit(this.value);
  }


}