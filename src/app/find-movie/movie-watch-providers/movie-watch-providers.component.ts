import { Component, Input } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { WatchProvider } from 'src/app/_shared/_models/watch-provider.model';
import { IFindMovieFilters } from '../_models/find-movie-filters.model';
import { MovieSearchService } from '../_services/movie-search.service';

@Component({
  selector: 'app-movie-watch-providers',
  templateUrl: './movie-watch-providers.component.html',
  styleUrls: ['./movie-watch-providers.component.scss']
})
export class MovieWatchProviderComponent {
  @Input() watchProviders: Array<WatchProvider> | null | undefined;

  private _selectedWatchProviderIds: Array<number> = [];
  private readonly _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly movieSearchService: MovieSearchService
  ) {
    movieSearchService.filters$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(res => {
        this._selectedWatchProviderIds = res?.watchProviders ?? [];
      })
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public hasProvider(watchProvider: WatchProvider): boolean {
    return this._selectedWatchProviderIds.findIndex(a => a === watchProvider.id) > -1;
  }
}
