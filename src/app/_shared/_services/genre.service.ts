import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { Genre } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private static API_KEY: string = '7ee3563f7a1eb4fe14f13ad51ab740d8';
  private _shouldLoad: boolean = true;
  public readonly allGenres$: Observable<Array<Genre>>;
  private readonly _allGenres: BehaviorSubject<Array<Genre>> = new BehaviorSubject<Array<Genre>>([]);

  public get genres(): Array<Genre> {
    return this._allGenres.value;
  }

  public readonly isLoading$: Observable<boolean>;
  private readonly _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly http: HttpClient
  ) {
    this.allGenres$ = this._allGenres.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
  }

  public loadGenres(): void {
    if (this._shouldLoad) {
      this._shouldLoad = false;
      this._isLoading.next(true);
      this._getAllGenres()
        .pipe(
          finalize(() => this._isLoading.next(false))
        )
        .subscribe(genres => {
          this._allGenres.next(genres);
        });
    }
  }

  private _getAllGenres(): Observable<Array<Genre>> {
    return this.http.get<{ genres: Array<Genre> }>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${GenreService.API_KEY}&language=en-US`)
      .pipe(map(a => a.genres))
  }

}
