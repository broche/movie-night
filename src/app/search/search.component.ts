import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounce, debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { SortByOption, SORT_BY_OPTIONS } from '../_consts/sort-by.const';
import { Genre } from '../_models';
import { MovieService } from '../_services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {

  public sortByOptions: Array<SortByOption> = SORT_BY_OPTIONS;
  public form: FormGroup;
  public genres$: Observable<Array<Genre>>;
  public totalResults$: Observable<number | undefined>;

  public get selectedGenres(): Array<Genre> {
    return this.form?.controls['genres'].value;
  }

  private readonly _unsubscribe$: Subject<void> = new Subject<void>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly movieService: MovieService
  ) {
    this.totalResults$ = movieService.totalResults$;
    this.genres$ = movieService.allGenres$;
    this.form = formBuilder.group({
      genres: '',
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

    // this.form.valueChanges
    //   .pipe(
    //     debounceTime(500),
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
      this.movieService.search(this.form.value)
    }

    this.form.markAllAsTouched();
  }
}
