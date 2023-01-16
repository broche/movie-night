import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../_models';
import { MovieService } from '../_services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public movieResults$: Observable<Array<Movie>>;
  public canLoadMore$: Observable<boolean>;

  constructor(
    private readonly movieService: MovieService
  ) {
    this.movieResults$ = movieService.movieResults$;
    this.canLoadMore$ = movieService.canLoadMore$;
  }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {

  }

  public loadMore(): void {
    this.movieService.loadMore();
  }
}
