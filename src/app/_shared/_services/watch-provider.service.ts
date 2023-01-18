import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { Genre } from '../_models';
import { IWatchProvider, WatchProvider } from '../_models/watch-provider.model';
import { TMDBResult } from '../_models/tmdb-result.model';

@Injectable({
  providedIn: 'root'
})
export class WatchProviderService {

  private static API_KEY: string = '7ee3563f7a1eb4fe14f13ad51ab740d8';
  private _shouldLoad: boolean = true;
  public readonly allWatchProviders$: Observable<Array<WatchProvider>>;
  private readonly _allWatchProviders: BehaviorSubject<Array<WatchProvider>> = new BehaviorSubject<Array<WatchProvider>>([]);

  public get watchProviders(): Array<WatchProvider> {
    return this._allWatchProviders.value;
  }

  public readonly isLoading$: Observable<boolean>;
  private readonly _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly http: HttpClient
  ) {
    this.allWatchProviders$ = this._allWatchProviders.asObservable();
    this.isLoading$ = this._isLoading.asObservable();
  }

  public loadWatchProviders(): void {
    if (this._shouldLoad) {
      this._shouldLoad = false;
      this._isLoading.next(true);
      this._getallWatchProviders()
        .pipe(
          finalize(() => this._isLoading.next(false))
        )
        .subscribe(watchProviders => {
          this._allWatchProviders.next(watchProviders);
        });
    }
  }

  private _getallWatchProviders(): Observable<Array<WatchProvider>> {
    return this.http.get<TMDBResult<IWatchProvider>>(`https://api.themoviedb.org/3/watch/providers/movie?api_key=${WatchProviderService.API_KEY}&language=en-U&watch_region=US`)
      .pipe(map(a => a.results.map(b => new WatchProvider(b))))
  }

}
