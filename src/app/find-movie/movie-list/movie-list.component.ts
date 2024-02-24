import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Movie } from '../../_shared/_models';
import { MovieDetailsService } from '../_services/movie-details.service';
import { MovieSearchService } from '../_services/movie-search.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ObserveVisibilityDirective } from '../../_shared/_directives/observe-visibility.directive';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
    standalone: true,
    imports: [RouterLink, MovieCardComponent, ObserveVisibilityDirective, MatProgressBar, AsyncPipe]
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
