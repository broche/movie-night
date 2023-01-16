import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { GenreService } from 'src/app/_shared/_services';
import { SortByOption, SORT_BY_OPTIONS } from '../../_shared/_consts/sort-by.const';
import { Genre } from '../../_shared/_models';
import { MovieSearchService } from '../_services/movie-search.service';

@Component({
  selector: 'app-movie-filters',
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.scss']
})
export class MovieFiltersComponent implements OnDestroy {

  public sortByOptions: Array<SortByOption> = SORT_BY_OPTIONS;
  public form: FormGroup;
  public genres$: Observable<Array<Genre>>;
  public totalResults$: Observable<number | undefined>;

  public get selectedGenres(): Array<Genre> {
    return this.form?.controls['genres'].value;
  }
  public get selectedNonGenres(): Array<Genre> {
    return this.form?.controls['nonGenres'].value;
  }

  private readonly _unsubscribe$: Subject<void> = new Subject<void>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly genreService: GenreService,
    private readonly movieSearchService: MovieSearchService
  ) {
    this.totalResults$ = movieSearchService.totalResults$;
    this.genres$ = genreService.allGenres$;
    this.form = formBuilder.group({
      genres: '',
      nonGenres: '',
      yearMin: 1985,
      yearMax: 2023,
      ratingMin: 6.2,
      ratingMax: 10,
      runtimeMin: 80,
      runtimeMax: 140,
      minimumVoteCount: 1000,
      includeAdult: false,
      sortBy: 'popularity.desc'
    });

    
    this.submit();
    
    // this.form.valueChanges
    //   .pipe(
    //     debounceTime(200),
    //     takeUntil(this._unsubscribe$)
    //   )
    //   .subscribe(res => {
    //     this.submit();
    //   })
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public submit(): void {
    if (this.form.valid) {
      // store the form data in localStorage somewhere


      // convert form into SearchParams
      this.movieSearchService.search(this.form.value)
    }

    this.form.markAllAsTouched();
  }
}
