import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';
import { IMovie, Movie } from '../../_shared/_models';
import { MatSidenav } from '@angular/material/sidenav';
import { IWatchProviderResponse, WatchProvider } from 'src/app/_shared/_models/watch-provider.model';
import { TMDBResult } from 'src/app/_shared/_models/tmdb-result.model';
import { GenreService } from 'src/app/_shared/_services';
import { IMovieCreditResponse, MovieCredit } from 'src/app/_shared/_models/movie-credit.model';

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

  public readonly castMembers$: Observable<Array<MovieCredit> | undefined>;
  private readonly _castMembers: BehaviorSubject<Array<MovieCredit> | undefined> = new BehaviorSubject<Array<MovieCredit> | undefined>(undefined);

  public readonly crewMembers$: Observable<Array<MovieCredit> | undefined>;
  private readonly _crewMembers: BehaviorSubject<Array<MovieCredit> | undefined> = new BehaviorSubject<Array<MovieCredit> | undefined>(undefined);
  public readonly director$: Observable<MovieCredit | undefined>;

  public readonly isLoading$: Observable<boolean>;
  private readonly _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private get movieId(): number | undefined {
    return this._movie.value?.id;
  }

  public detailsSidenav$: Observable<MatSidenav | undefined>;
  private _detailsSidenav: BehaviorSubject<MatSidenav | undefined> = new BehaviorSubject<MatSidenav | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly genreService: GenreService
  ) {
    this.movie$ = this._movie.asObservable();
    this.streamingOptions$ = this._streamingOptions.asObservable();
    this.rentalOptions$ = this._rentalOptions.asObservable();
    this.similarMovies$ = this._similarMovies.asObservable();
    this.castMembers$ = this._castMembers.asObservable();
    this.crewMembers$ = this._crewMembers.asObservable();
    this.detailsSidenav$ = this._detailsSidenav.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
    this.director$ = this.crewMembers$
      .pipe(
        map(a => a?.filter(b => b.job === 'Director')[0])
      )
  }

  public setSidenav(sidenav: MatSidenav): void {
    this._detailsSidenav?.next(sidenav);
  }

  public openSidenav(): void {
    if (this._detailsSidenav.value) {
      this._detailsSidenav.value.open();
    } else {
      this.detailsSidenav$
      .pipe(
        filter(a => !!a),
        take(1)
      )
      .subscribe(r => {
        r?.open();
      });
    }
  }
  public closeSidenav(): void {
    if (this._detailsSidenav.value) {
      this._detailsSidenav.value.close();
    }
  }

  public loadMovieById(id: string): void {
    this._isLoading.next(true);
    this._clearData();
    this._getMovieDetails(id)
      .pipe(

      )
      .subscribe(movie => {
        this._movie.next(movie);

        this._loadCredits(id);
        this._loadWatchProviders(id);
        // this._loadImages();
        // this._loadReviews();
        this._loadSimilarMovies(id);
        // this._loadRecommendations();
        // this._loadVideos();
      })
  }

  private _clearData(): void {
    this._movie.next(undefined);
    this._streamingOptions.next(undefined);
    this._rentalOptions.next(undefined);
    this._similarMovies.next(undefined);
    this._castMembers.next(undefined);
    this._crewMembers.next(undefined);
  }

  private _getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<IMovie>(`https://api.themoviedb.org/3/movie/${id.toString()}?api_key=${MovieDetailsService.API_KEY}&language=en-US`)
      .pipe(map(a => new Movie(a)))
  }
  
  private _loadWatchProviders(id: string): void {
    this.http.get<IWatchProviderResponse>(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${MovieDetailsService.API_KEY}&language=en-US`)
      .pipe(
        map(a => a.results.US)
      ).subscribe(res => {
        this._rentalOptions.next(res.rent?.map(a => new WatchProvider(a)) ?? [])
        this._streamingOptions.next(res.flatrate?.map(a => new WatchProvider(a)) ?? [])
      })
  }

  private _loadSimilarMovies(id: string): void {
    this.http.get<TMDBResult<IMovie>>(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${MovieDetailsService.API_KEY}&language=en-US`)
      .pipe(
        map(a => a.results.splice(0, 5))
      ).subscribe(res => {
        this._similarMovies.next(res.map(a => new Movie(a, this.genreService.genres)));
      });
  }

  private _loadCredits(id: string): void {
    this.http.get<IMovieCreditResponse>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${MovieDetailsService.API_KEY}&language=en-US`)
      .pipe(
        map(a => { 
          return {
            cast: a.cast.splice(0, 8), 
            crew: a.crew.splice(0, 8) 
          };
        })
      ).subscribe(res => {
        this._castMembers.next(res.cast.map(a => new MovieCredit(a)));
        this._crewMembers.next(res.crew.map(a => new MovieCredit(a)));
      });
  }
}
