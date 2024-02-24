import { Component, Input } from '@angular/core';
import { Movie } from '../../_shared/_models';
import { SlicePipe } from '@angular/common';
import { MatCardImage } from '@angular/material/card';
import { ImageFallbackDirective } from '../../_shared/_directives/image-fallback.directive';
import { MovieRatingPillComponent } from '../movie-rating-pill/movie-rating-pill.component';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss'],
    standalone: true,
    imports: [MovieRatingPillComponent, ImageFallbackDirective, MatCardImage, SlicePipe]
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() size?: 'sm' | 'md' | 'lg' = 'md';
}
