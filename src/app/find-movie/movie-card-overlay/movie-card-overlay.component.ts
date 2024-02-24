import { Component, ElementRef, Input, OnInit, booleanAttribute, input } from '@angular/core';
import { Movie } from '../../_shared/_models';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { MatCardImage } from '@angular/material/card';
import { ImageFallbackDirective } from '../../_shared/_directives/image-fallback.directive';
import { MovieRatingPillComponent } from '../movie-rating-pill/movie-rating-pill.component';
import { MovieDetailsService } from '../_services/movie-details.service';
import { Observable } from 'rxjs';
import { VideoComponent } from 'src/app/_shared/components/video/video.component';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatChip, MatChipListbox } from '@angular/material/chips';

@Component({
    selector: 'app-movie-card-overlay',
    templateUrl: './movie-card-overlay.component.html',
    styleUrls: ['./movie-card-overlay.component.scss'],
    standalone: true,
    imports: [
      MovieRatingPillComponent,
      ImageFallbackDirective, 
      MatCardImage, 
      SlicePipe,
      VideoComponent,
      MatIcon,
      AsyncPipe,
      MatDivider,
      MatChip, 
      MatChipListbox
    ],
})
export class MovieCardOverlayComponent implements OnInit {
  @Input() movie!: Movie;
  
  public readonly trailerId$: Observable<string | undefined>;


  constructor(
    private readonly _movieDetailsService: MovieDetailsService,
    private readonly _elementRef: ElementRef
  ) {
    this.trailerId$ = _movieDetailsService.trailerId$;
  }

  public ngOnInit(): void {
    console.log('hello', this.movie.id);
    // this._movieDetailsService.startWatching();
    this._movieDetailsService.loadMovieById(this.movie.id.toString());
  }

  public ngOnDestroy(): void {

  }
}
