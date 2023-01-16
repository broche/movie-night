import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../_shared/_models';
import { MovieCredit } from '../../_shared/_models/movie-credit.model';
import { WatchProvider } from '../../_shared/_models/watch-provider.model';
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
  public castMembers$: Observable<Array<MovieCredit> | undefined>;
  public crewMembers$: Observable<Array<MovieCredit> | undefined>;
  public director$: Observable<MovieCredit | undefined>;
  constructor(
    private readonly movieDetailsService: MovieDetailsService
  ) {
    this.movie$ = movieDetailsService.movie$;
    this.rentalOptions$ = movieDetailsService.rentalOptions$;
    this.streamingOptions$ = movieDetailsService.streamingOptions$;
    this.similarMovies$ = movieDetailsService.similarMovies$;    
    this.castMembers$ = movieDetailsService.castMembers$;
    this.crewMembers$ = movieDetailsService.crewMembers$;
    this.director$ = movieDetailsService.director$;
  }
}
