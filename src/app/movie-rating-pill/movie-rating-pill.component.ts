import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-rating-pill',
  templateUrl: './movie-rating-pill.component.html',
  styleUrls: ['./movie-rating-pill.component.scss']
})
export class MovieRatingPillComponent {
  @Input() rating!: number;
  public get ratingClass(): string {
    return `rating score-${Math.ceil(this.rating)}`;
  }
}
