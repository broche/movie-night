import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, map, Observable, tap, withLatestFrom, zip } from 'rxjs';
import { Genre, IMovie, ISearchForm, Movie, TMDBDiscoverRequest, TMDBResult } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private static API_KEY: string = '7ee3563f7a1eb4fe14f13ad51ab740d8';

  private readonly _currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private readonly _totalPages: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public readonly totalResults$: Observable<number | undefined>;
  private readonly _totalResults: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  private _params: ISearchForm | undefined;

  public readonly movieResults$: Observable<Array<Movie>>;
  private readonly _movieResults: BehaviorSubject<Array<Movie>> = new BehaviorSubject<Array<Movie>>([]);;

  public readonly allGenres$: Observable<Array<Genre>>;
  private readonly _allGenres: BehaviorSubject<Array<Genre>> = new BehaviorSubject<Array<Genre>>([]);;

  public readonly isSearching$: Observable<boolean>;
  private readonly _isSearching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly loadingMore$: Observable<boolean>;
  private readonly _loadingMore: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly canLoadMore$: Observable<boolean>;

  constructor(
    private readonly http: HttpClient
  ) { 
    this.totalResults$ = this._totalResults.asObservable();
    this.movieResults$ = this._movieResults.asObservable();
    this.allGenres$ = this._allGenres.asObservable();
    this.isSearching$ = this._isSearching.asObservable();
    this.loadingMore$ = this._loadingMore.asObservable();

    this.canLoadMore$ = zip(
      this._currentPage,
      this._totalPages
    ).pipe(map(res => res[0] < res[1]))
  }

  public loadGenres(): void {
    this._getAllGenres()
      .subscribe(genres => {
        this._allGenres.next(genres);
      })
  }

  public search(params: ISearchForm): void {
    this._isSearching.next(true);
    this._params = params;
    this._search(params)
      .pipe(
        tap(a => {
          this._currentPage.next(a.page);
          this._totalPages.next(a.total_pages);
          this._totalResults.next(a.total_results);
        }),
        map(a => a.results.map(b => new Movie(b))),
        finalize(() => {
          this._isSearching.next(false);
        })
      )
      .subscribe((movies: Array<Movie>) => {
        this._movieResults.next(movies);
      });
  }

  public loadMore(): void {
    if (this._params && this._currentPage.value < this._totalPages.value) {
      this._loadingMore.next(true);
      this._search(this._params, this._currentPage.value + 1)
        .pipe(
          tap(a => {
            this._currentPage.next(a.page);
            this._totalPages.next(a.total_pages);
            this._totalResults.next(a.total_results);
          }),
          map(a => a.results.map(b => new Movie(b))),
          finalize(() => {
            this._loadingMore.next(false);
          })
        )
        .subscribe((movies: Array<Movie>) => {
          this._movieResults.next(this._movieResults.value.concat(movies));
        });
    }
  }
  
  private _getAllGenres(): Observable<Array<Genre>> {
    return this.http.get<{ genres: Array<Genre> }>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${MovieService.API_KEY}&language=en-US`)
      .pipe(map(a => a.genres))
  }

  private _search(params: ISearchForm, page?: number): Observable<TMDBResult<IMovie>> {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${MovieService.API_KEY}&language=en-US&sort_by=popularity.desc`;

    const request: TMDBDiscoverRequest | any = {
      page: page ?? 1,
      sort_by: params.sortBy,
      'release_date.gte': params.yearMin,
      'release_date.lte': params.yearMax,
      // with_release_type: 
      'vote_average.gte': params.ratingMin,
      'vote_average.lte': params.ratingMax,
      with_genres: !!params.genres ? params.genres?.map(a => a.id).join(',') : [],
      'with_runtime.gte': params.runtimeMin,
      'with_runtime.lte': params.runtimeMax,
      'vote_count.gte': params.minimumVoteCount
    }
    const parameterizedObj = Object.keys(request).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(request[k])}`).join('&');
    console.log('param obj: ', parameterizedObj);

    return this.http.get<TMDBResult<IMovie>>(`${url}&${parameterizedObj}`);
  }
}
