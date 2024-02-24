import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, filter, map, Observable, switchMap, take } from 'rxjs';
import { IMovie, Movie } from '../../_shared/_models';
import { MatSidenav } from '@angular/material/sidenav';
import { IWatchProviderResponse, WatchProvider } from 'src/app/_shared/_models/watch-provider.model';
import { TMDBResult } from 'src/app/_shared/_models/tmdb-result.model';
import { GenreService } from 'src/app/_shared/_services';
import { IMovieCreditResponse, MovieCredit } from 'src/app/_shared/_models/movie-credit.model';
import { IPerson, Person } from 'src/app/_shared/_models/person.model';
import { IImage, Image } from 'src/app/_shared/_models/image.model';

@Injectable({
  providedIn: 'root'
})
export class PersonDetailsService {

  private static API_KEY: string = '7ee3563f7a1eb4fe14f13ad51ab740d8';

  public readonly person$: Observable<Person | undefined>;
  private readonly _person: BehaviorSubject<Person | undefined> = new BehaviorSubject<Person | undefined>(undefined);

  public readonly movieCredits$: Observable<Array<Movie> | undefined>;
  private readonly _movieCredits: BehaviorSubject<Array<Movie> | undefined> = new BehaviorSubject<Array<Movie> | undefined>(undefined);

  public readonly images$: Observable<Array<Image> | undefined>;
  private readonly _images: BehaviorSubject<Array<Image> | undefined> = new BehaviorSubject<Array<Image> | undefined>(undefined);

  public readonly isLoading$: Observable<boolean>;
  private readonly _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public detailsSidenav$: Observable<MatSidenav | undefined>;
  private _detailsSidenav: BehaviorSubject<MatSidenav | undefined> = new BehaviorSubject<MatSidenav | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly genreService: GenreService
  ) {
    this.person$ = this._person.asObservable();
    this.movieCredits$ = this._movieCredits.asObservable();
    this.images$ = this._images.asObservable();
    this.detailsSidenav$ = this._detailsSidenav.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
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

  public loadPersonById(id: string): void {
    this._isLoading.next(true);
    this._clearData();
    this._getPersonDetails(id)
      .pipe(

      )
      .subscribe(movie => {
        this._person.next(movie);
        this._loadMovieCredits(id);
        this._loadImages(id);
      })
  }

  private _clearData(): void {
    this._person.next(undefined);
    this._movieCredits.next(undefined);
    this._images.next(undefined);
  }

  private _getPersonDetails(id: string): Observable<Person> {
    return this.http.get<IPerson>(`https://api.themoviedb.org/3/person/${id}?api_key=${PersonDetailsService.API_KEY}&language=en-US`)
      .pipe(map(a => new Person(a)))
  }

  private _loadMovieCredits(id: string): void {
    this.http.get<{
      cast: Array<IMovie>
    }>(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${PersonDetailsService.API_KEY}&language=en-US`)
      .pipe(
        map(a => a.cast),
        map(a => a.sort((b, c) => c.vote_average - b.vote_average)),
        map(a => a.filter(a => a.poster_path))
        // map(a => a.splice(0, 15))
      ).subscribe(res => {
        this._movieCredits.next(res.map(a => new Movie(a, this.genreService.genres)));
      });
  }
  private _loadImages(id: string): void {
    this.http.get<{
      profiles: Array<IImage>
    }>(`https://api.themoviedb.org/3/person/${id}/images?api_key=${PersonDetailsService.API_KEY}&language=en-US`)
      .pipe(
        map(a => a.profiles)
        // map(a => a.splice(0, 15))
      ).subscribe(res => {
        if (res.length > 3) {
          while (res.length < 12) {
            res.push(...res);
          }
          this._images.next(res.map(a => new Image(a)));
        } else {
          this._images.next(undefined);
        }
      });
  }
}
