import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IMovie, Movie } from '../../_shared/_models';
import { MatSidenav } from '@angular/material/sidenav';
import { IWatchProviderResponse, WatchProvider } from 'src/app/_shared/_models/watch-provider.model';
import { TMDBResult } from 'src/app/_shared/_models/tmdb-result.model';
import { GenreService } from 'src/app/_shared/_services';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  private static API_KEY: string = '7ee3563f7a1eb4fe14f13ad51ab740d8';

  public readonly movie$: Observable<Movie | undefined>;
  private readonly _movie: BehaviorSubject<Movie | undefined> = new BehaviorSubject<Movie | undefined>(undefined);

  public readonly rentalOptions$: Observable<Array<WatchProvider> | undefined>;
  private readonly _rentalOptions: BehaviorSubject<Array<WatchProvider> | undefined> = new BehaviorSubject<Array<WatchProvider> | undefined>(undefined);

  public readonly streamingOptions$: Observable<Array<WatchProvider> | undefined>;
  private readonly _streamingOptions: BehaviorSubject<Array<WatchProvider> | undefined> = new BehaviorSubject<Array<WatchProvider> | undefined>(undefined);

  public readonly similarMovies$: Observable<Array<Movie> | undefined>;
  private readonly _similarMovies: BehaviorSubject<Array<Movie> | undefined> = new BehaviorSubject<Array<Movie> | undefined>(undefined);

  public readonly isLoading$: Observable<boolean>;
  private readonly _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private get movieId(): number | undefined {
    return this._movie.value?.id;
  }
  private _detailsSidenav?: MatSidenav;

  constructor(
    private readonly http: HttpClient,
    private readonly genreService: GenreService
  ) {
    this.movie$ = this._movie.asObservable();
    this.streamingOptions$ = this._streamingOptions.asObservable();
    this.rentalOptions$ = this._rentalOptions.asObservable();
    this.similarMovies$ = this._similarMovies.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
  }

  public setSidenav(sidenav: MatSidenav): void {
    this._detailsSidenav = sidenav;
  }

  public openSidenav(): void {
    this._detailsSidenav?.open();
  }

  public loadMovieById(id: string): void {
    this._isLoading.next(true);
    this._clearData();
    this._getMovieDetails(id)
      .pipe(

      )
      .subscribe(movie => {
        this._movie.next(movie);

        // this._loadCredits();
        this._loadWatchProviders();
        // this._loadImages();
        // this._loadReviews();
        this._loadSimilarMovies();
        // this._loadRecommendations();
        // this._loadVideos();
      })
  }

  private _clearData(): void {
    this._movie.next(undefined);
    this._streamingOptions.next(undefined);
    this._rentalOptions.next(undefined);
    this._similarMovies.next(undefined);
  }

  private _getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<IMovie>(`https://api.themoviedb.org/3/movie/${id.toString()}?api_key=${MovieDetailsService.API_KEY}&language=en-US`)
      .pipe(map(a => new Movie(a)))
  }
  
  private _loadWatchProviders(): void {
    this.http.get<IWatchProviderResponse>(`https://api.themoviedb.org/3/movie/${this.movieId}/watch/providers?api_key=${MovieDetailsService.API_KEY}&language=en-US`)
      .pipe(
        map(a => a.results.US)
      ).subscribe(res => {
        this._rentalOptions.next(res.rent?.map(a => new WatchProvider(a)) ?? [])
        this._streamingOptions.next(res.flatrate?.map(a => new WatchProvider(a)) ?? [])
      })
  }
  private _loadSimilarMovies(): void {
    this.http.get<TMDBResult<IMovie>>(`https://api.themoviedb.org/3/movie/${this.movieId}/similar?api_key=${MovieDetailsService.API_KEY}&language=en-US`)
      .pipe(
        map(a => a.results.splice(0, 5))
      ).subscribe(res => {
        this._similarMovies.next(res.map(a => new Movie(a, this.genreService.genres)));
      });
  }
}
