import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-movie-rating-pill',
    templateUrl: './movie-rating-pill.component.html',
    styleUrls: ['./movie-rating-pill.component.scss'],
    standalone: true,
    imports: [DecimalPipe]
})
export class MovieRatingPillComponent {
  @Input() rating!: number;
  @Input() size?: 'sm' | 'md' | 'lg' = 'md';
  public get ratingClass(): string {
    return `rating score-${Math.ceil(this.rating)}`;
  }
}
