import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Movie } from '../../_shared/_models';
import { MovieDetailsService } from '../_services/movie-details.service';
import { MovieSearchService } from '../_services/movie-search.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  public movieResults$: Observable<Array<Movie>>;
  public canLoadMore$: Observable<boolean>;
  public selectedMovie$: Observable<Movie | undefined>;

  constructor(
    private readonly movieSearchService: MovieSearchService,
    private readonly movieDetailsService: MovieDetailsService
  ) {
    this.movieResults$ = movieSearchService.movieResults$;
    this.canLoadMore$ = movieSearchService.canLoadMore$;
    this.selectedMovie$ = movieDetailsService.movie$;
  }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {

  }

  public loadMore(): void {
    this.movieSearchService.loadMore();
  }
}
