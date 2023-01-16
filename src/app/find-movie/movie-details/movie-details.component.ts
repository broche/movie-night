import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/_shared/_models';
import { WatchProvider } from 'src/app/_shared/_models/watch-provider.model';
import { MovieDetailsService } from '../_services/movie-details.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  public movie$: Observable<Movie | undefined>;
  public rentalOptions$: Observable<Array<WatchProvider> | undefined>;
  public streamingOptions$: Observable<Array<WatchProvider> | undefined>;
  public similarMovies$: Observable<Array<Movie> | undefined>;
  constructor(
    private readonly movieDetailsService: MovieDetailsService
  ) {
    this.movie$ = movieDetailsService.movie$;
    this.rentalOptions$ = movieDetailsService.rentalOptions$;
    this.streamingOptions$ = movieDetailsService.streamingOptions$;
    this.similarMovies$ = movieDetailsService.similarMovies$;
  }
}
