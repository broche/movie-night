import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { GenreService } from 'src/app/_shared/_services';
import { SortByOption, SORT_BY_OPTIONS } from '../../_shared/_consts/sort-by.const';
import { Genre, IFindMovieFilters } from '../../_shared/_models';
import { MovieSearchService } from '../_services/movie-search.service';

@Component({
  selector: 'app-movie-filters',
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.scss']
})
export class MovieFiltersComponent implements OnDestroy {

  private static DEFAULT_FILTERS: IFindMovieFilters = {
    genres: [],
    excludedGenres: [],
    yearMin: 1985,
    yearMax: 2023,
    ratingMin: 6.2,
    ratingMax: 10,
    runtimeMin: 80,
    runtimeMax: 140,
    minimumVoteCount: 1000,
    includeAdult: false,
    sortBy: 'revenue.desc'
  };
  public sortByOptions: Array<SortByOption> = SORT_BY_OPTIONS;
  public form: FormGroup;
  public genres$: Observable<Array<Genre>>;
  public totalResults$: Observable<number | undefined>;

  public get selectedGenreIds(): Array<number> {
    return this.form?.controls['genres'].value ?? [];
  }
  public get excludedGenreIds(): Array<number> {
    return this.form?.controls['excludedGenres'].value ?? [];
  }

  public genreMap: { [id: string ]: { genre: Genre, state: number } } = {};
  public genreMap$: Observable<{ [id: string ]: Genre }>;
  public genresLoaded$: Observable<boolean>;

  private readonly _unsubscribe$: Subject<void> = new Subject<void>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly genreService: GenreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly movieSearchService: MovieSearchService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.totalResults$ = movieSearchService.totalResults$;
    this.genres$ = genreService.allGenres$;
    this.genresLoaded$ = genreService.allGenres$.pipe(map(a => !!a));
    this.genreMap$ = genreService.allGenres$
      .pipe(
        map(a => a?.reduce((a, b) => ({...a, [b.id]: b}), {}) ?? undefined)
      );

    this.form = formBuilder.group(MovieFiltersComponent.DEFAULT_FILTERS);

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
    if (cachedJson) {
      const cachedFilters = JSON.parse(cachedJson);
      if (cachedFilters) {
        this.form.patchValue(cachedFilters);
      } else {
        this.submit();
      }
    } else {
      this.submit();
    }
    // const mappedFiltersFromQuery = this.getMappedFiltersFromQuery();
    // if (mappedFiltersFromQuery) {
    //   this.form.patchValue(mappedFiltersFromQuery);
    // } else {
    //   this.submit();
    // }

    // this.submit();
  }

  public updateGenreMap(event: MatCheckboxChange, genre: Genre): boolean {
    
    let nextState = this.genreMap[genre.id]?.state ?? 0;
    nextState = nextState > 1
      ? 0
      : nextState + 1;

    this.genreMap[genre.id] = {
      genre,
      state: nextState
    }
    event.source.checked = nextState === 1;
    event.source.indeterminate = nextState === 2;

    const genres = Object.keys(this.genreMap).filter(a => this.genreMap[a].state === 1).map(a => this.genreMap[a].genre);
    const excludedGenres = Object.keys(this.genreMap).filter(a => this.genreMap[a].state === 2).map(a => this.genreMap[a].genre);

    this.form.controls['genres'].setValue(genres);
    this.form.controls['excludedGenres'].setValue(excludedGenres);

    return false;
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

  public clearFilters(): void {
    // this.form.reset();
    this.form.patchValue(MovieFiltersComponent.DEFAULT_FILTERS, { onlySelf: true });
  }
}
