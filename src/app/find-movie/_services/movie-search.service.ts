import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, forkJoin, map, Observable, tap, zip } from 'rxjs';
import { Genre, IMovie, IFindMovieFilters, Movie, TMDBDiscoverRequest } from '../../_shared/_models';
import { MatSidenav } from '@angular/material/sidenav';
import { TMDBResult } from 'src/app/_shared/_models/tmdb-result.model';
import { GenreService } from 'src/app/_shared/_services';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {

  private static API_KEY: string = '7ee3563f7a1eb4fe14f13ad51ab740d8';

  private readonly _currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readonly _totalPages: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public readonly totalResults$: Observable<number | undefined>;
  private readonly _totalResults: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private _params: IFindMovieFilters | undefined;

  public readonly movieResults$: Observable<Array<Movie>>;
  private readonly _movieResults: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);;

  public readonly isLoading$: Observable<boolean>;
  private readonly _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly canLoadMore$: Observable<boolean>;

  constructor(
    private readonly http: HttpClient,
    private readonly genreService: GenreService
  ) {
    this.totalResults$ = this._totalResults.asObservable();
    this.movieResults$ = this._movieResults.asObservable();
    this.isLoading$ = this._isLoading.asObservable();

    this.canLoadMore$ = zip(
      this._currentPage,
      this._totalPages,
      this._totalResults
    ).pipe(map(res => res[0] < res[1] && !!res[2]));

    // const cachedJSON = localStorage.getItem('movie-list')
    // if (cachedJSON) {
    //   this._movieResults.next(JSON.parse(cachedJSON));
    // }
  }

  public search(params: IFindMovieFilters): void {
    localStorage.removeItem('movie-list');
    this._totalPages.next(1);
    this._currentPage.next(0);
    this._totalResults.next(undefined);
    this.loadMovies(params);
  }

  public loadMore(): void {
    if (this._params && this._currentPage.value < this._totalPages.value) {
      this.loadMovies(this._params, { concat: true });
    }
  }

  private loadMovies(params: IFindMovieFilters, options?: { concat?: boolean, additionalLoads?: number }) {
    this._params = params;
    this._isLoading.next(true);
    this._search(this._params!, this._currentPage.value + 1)
      .pipe(
        tap(a => {
          this._currentPage.next(a.page);
          this._totalPages.next(a.total_pages);
          this._totalResults.next(a.total_results);
        }),
        map(a => a.results.map(b => new Movie(b, this.genreService.genres))),
        finalize(() => {
          this._isLoading.next(false);

        })
      )
      .subscribe((movies: Array<Movie>) => {
        this._updateMovieList(options?.concat
          ? this._movieResults.value.concat(movies)
          : movies
        );

        if (options?.additionalLoads ?? 0 > 0) {
          this.loadMovies(params, { concat: true, additionalLoads: options?.additionalLoads! - 1 });
        }
      });
  }

  private _updateMovieList(movieList: Array<Movie>): void {
    this._movieResults.next(movieList);
    localStorage.setItem('movie-list', JSON.stringify(movieList));
  }

  private _search(params: IFindMovieFilters, page?: number): Observable<TMDBResult<IMovie>> {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${MovieSearchService.API_KEY}&language=en-US&sort_by=popularity.desc`;

    const request: TMDBDiscoverRequest | any = {
      page: page ?? 1,
      sort_by: params.sortBy,
      'release_date.gte': params.yearMin,
      'release_date.lte': params.yearMax,
      // with_release_type: 
      'vote_average.gte': params.ratingMin,
      'vote_average.lte': params.ratingMax,
      with_genres: !!params.genres ? params.genres?.map(a => a.id).join(',') : [],
      without_genres: !!params.nonGenres ? params.nonGenres?.map(a => a.id).join(',') : [],
      'with_runtime.gte': params.runtimeMin,
      'with_runtime.lte': params.runtimeMax,
      'vote_count.gte': params.minimumVoteCount
    }
    const parameterizedObj = Object.keys(request).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(request[k])}`).join('&');
    console.log('param obj: ', parameterizedObj);

    return this.http.get<TMDBResult<IMovie>>(`${url}&${parameterizedObj}`);
  }
}
