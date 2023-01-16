import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../_shared/_models';
import { MovieSearchService } from '../_services/movie-search.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  public movieResults$: Observable<Array<Movie>>;
  public canLoadMore$: Observable<boolean>;

  constructor(
    private readonly movieSearchService: MovieSearchService
  ) {
    this.movieResults$ = movieSearchService.movieResults$;
    this.canLoadMore$ = movieSearchService.canLoadMore$;
  }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {

  }

  public loadMore(): void {
    this.movieSearchService.loadMore();
  }
}
