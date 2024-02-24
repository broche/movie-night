import { Component, Input, booleanAttribute, input } from '@angular/core';
import { Movie } from '../../_shared/_models';
import { SlicePipe } from '@angular/common';
import { MatCardImage } from '@angular/material/card';
import { ImageFallbackDirective } from '../../_shared/_directives/image-fallback.directive';
import { MovieRatingPillComponent } from '../movie-rating-pill/movie-rating-pill.component';
import { MovieCardOverlayComponent } from '../movie-card-overlay/movie-card-overlay.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MovieDetailsService } from '../_services/movie-details.service';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss'],
    standalone: true,
    imports: [
      MovieRatingPillComponent, 
      ImageFallbackDirective, 
      MatCardImage, 
      SlicePipe,
      MovieCardOverlayComponent
    ]
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() size?: 'sm' | 'md' | 'lg' = 'md';
  @Input({ transform: booleanAttribute }) @Input() expandable = false;

  hoverTimeout: any;
  protected isExpanded = false;

  constructor(
    private readonly _movieDetailsService: MovieDetailsService
  ) {

  }

  ngOnInit(): void {
    this.isExpanded = false;
  }

  onMouseEnter(movie: Movie): void {
    if (this.expandable) {
      this.hoverTimeout = setTimeout(() => {
        this.isExpanded = true; // Add isExpanded property to your movie objects
        this._movieDetailsService.startWatching();
      }, 400);
    }
  }

  onMouseLeave(movie: Movie): void {
    if (this.expandable) {
      clearTimeout(this.hoverTimeout);
      this.isExpanded = false;
    }
  }
}
