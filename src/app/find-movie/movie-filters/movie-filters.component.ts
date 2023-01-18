import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { WatchProvider } from '../../_shared/_models/watch-provider.model';
import { GenreService } from '../../_shared/_services';
import { WatchProviderService } from '../../_shared/_services/watch-provider.service';
import { SortByOption, SORT_BY_OPTIONS } from '../../_shared/_consts/sort-by.const';
import { Genre, IFindMovieFilters } from '../../_shared/_models';
import { MovieSearchService } from '../_services/movie-search.service';

@Component({
  selector: 'app-movie-filters',
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.scss']
})
export class MovieFiltersComponent implements OnDestroy {

  private static DEFAULT_FILTERS: IFindMovieFilters | any = {
    genres: [12],
    excludedGenres: [],
    watchProviders: [8, 9, 337, 15, 384, 387, 582],
    yearMin: 1985,
    yearMax: 2023,
    ratingMin: 6.2,
    ratingMax: 10,
    runtimeMin: 80,
    runtimeMax: 140,
    minimumVoteCount: 1000,
    includeAdult: false,
    sortBy: 'popularity.desc'
  };

  private static CLEARED_FILTERS: IFindMovieFilters | any = {
    genres: [],
    excludedGenres: [],
    watchProviders: [],
    yearMin: 1900,
    yearMax: 2023,
    ratingMin: 0,
    ratingMax: 10,
    runtimeMin: 70,
    runtimeMax: 220,
    minimumVoteCount: 0,
    includeAdult: false,
    sortBy: ''
  };

  public sortByOptions: Array<SortByOption> = SORT_BY_OPTIONS;
  public form: FormGroup;
  public genres$: Observable<Array<Genre>>;
  public watchProviders$: Observable<Array<WatchProvider>>;
  public totalResults$: Observable<number | undefined>;

  public get selectedGenreIds(): Array<number> {
    return this.form?.controls['genres'].value ?? [];
  }
  public get excludedGenreIds(): Array<number> {
    return this.form?.controls['excludedGenres'].value ?? [];
  }
  public get selectedWatchProviderIds(): Array<number> {
    return this.form?.controls['watchProviders'].value ?? [];
  }

  public genreMap$: Observable<{ [id: string ]: Genre | undefined }>;
  public watchProviderMap$: Observable<{ [id: string ]: WatchProvider | undefined }>;

  private readonly _unsubscribe$: Subject<void> = new Subject<void>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly genreService: GenreService,
    private readonly watchProviderService: WatchProviderService,
    private readonly movieSearchService: MovieSearchService
  ) {

    this.totalResults$ = movieSearchService.totalResults$;

    this.genres$ = genreService.allGenres$;
    this.watchProviders$ = watchProviderService.allWatchProviders$;

    this.genreMap$ = genreService.allGenres$
      .pipe(
        map(a => a?.reduce((a, b) => ({...a, [b.id]: b}), {}) ?? undefined)
      );

    this.watchProviderMap$ = watchProviderService.allWatchProviders$
      .pipe(
        map(a => a?.reduce((a, b) => ({...a, [b.id]: b}), {}) ?? undefined)
      );

    
    this.form = formBuilder.group({
      genres: undefined,
      excludedGenres: undefined,
      watchProviders: undefined,
      yearMin: undefined,
      yearMax: undefined,
      ratingMin: undefined,
      ratingMax: undefined,
      runtimeMin: undefined,
      runtimeMax: undefined,
      minimumVoteCount: undefined,
      includeAdult: undefined,
      sortBy: undefined
    });

    this.form.valueChanges
      .pipe(
        debounceTime(200),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(res => {
        this.submit();
        localStorage.setItem('movie-search-filters', JSON.stringify(this.form.value));
      });

    const cachedJson = localStorage.getItem('movie-search-filters');
    let cachedFilters = undefined;
    if (cachedJson) {
      cachedFilters = JSON.parse(cachedJson);
    }
    if (cachedFilters) {
      this.form.patchValue(cachedFilters);
    } else {
      this.form.patchValue(MovieFiltersComponent.DEFAULT_FILTERS)
      this.submit();
    }
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public submit(): void {
    if (this.form.valid) {
      this.movieSearchService.search(this.form.value)
    }

    this.form.markAllAsTouched();
  }

  public resetDefaultFilters(): void {
    this.form.patchValue(MovieFiltersComponent.DEFAULT_FILTERS, { onlySelf: true });
  }

  public clearFilters(): void {
    this.form.patchValue(MovieFiltersComponent.CLEARED_FILTERS, { onlySelf: true });
  }
}


/*

  // public updateGenreMap(event: MatCheckboxChange, genre: Genre): boolean {
    
  //   let nextState = this.genreMap[genre.id]?.state ?? 0;
  //   nextState = nextState > 1
  //     ? 0
  //     : nextState + 1;

  //   this.genreMap[genre.id] = {
  //     genre,
  //     state: nextState
  //   }
  //   event.source.checked = nextState === 1;
  //   event.source.indeterminate = nextState === 2;

  //   const genres = Object.keys(this.genreMap).filter(a => this.genreMap[a].state === 1).map(a => this.genreMap[a].genre);
  //   const excludedGenres = Object.keys(this.genreMap).filter(a => this.genreMap[a].state === 2).map(a => this.genreMap[a].genre);

  //   this.form.controls['genres'].setValue(genres);
  //   this.form.controls['excludedGenres'].setValue(excludedGenres);

  //   return false;
  // }

*/