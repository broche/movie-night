import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject, filter, take, takeUntil } from 'rxjs';
import { IImage, Image } from 'src/app/_shared/_models/image.model';
import { Video } from 'src/app/_shared/_models/video.model';
import { Movie } from '../../_shared/_models';
import { MovieCredit } from '../../_shared/_models/movie-credit.model';
import { WatchProvider } from '../../_shared/_models/watch-provider.model';
import { MovieDetailsService } from '../_services/movie-details.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  public movie$: Observable<Movie | undefined>;
  public rentalOptions$: Observable<Array<WatchProvider> | undefined>;
  public streamingOptions$: Observable<Array<WatchProvider> | undefined>;
  public purchaseOptions$: Observable<Array<WatchProvider> | undefined>;
  public similarMovies$: Observable<Array<Movie> | undefined>;
  public castMembers$: Observable<Array<MovieCredit> | undefined>;
  public crewMembers$: Observable<Array<MovieCredit> | undefined>;
  public posterImages$: Observable<Array<Image> | undefined>;
  public backdropImages$: Observable<Array<Image> | undefined>;
  public videos$: Observable<Array<Video> | undefined>;
  public trailerId$: Observable<string | undefined>;
  public director$: Observable<MovieCredit | undefined>;
  public isWatching$: Observable<boolean>;
  public fromMovieList: boolean = false;
  private readonly _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly movieDetailsService: MovieDetailsService,
    protected readonly location: Location,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.movie$ = movieDetailsService.movie$;
    this.rentalOptions$ = movieDetailsService.rentalOptions$;
    this.purchaseOptions$ = movieDetailsService.purchaseOptions$;
    this.streamingOptions$ = movieDetailsService.streamingOptions$;
    this.similarMovies$ = movieDetailsService.similarMovies$;
    this.castMembers$ = movieDetailsService.castMembers$;
    this.crewMembers$ = movieDetailsService.crewMembers$;
    this.posterImages$ = movieDetailsService.posterImages$;
    this.backdropImages$ = movieDetailsService.backdropImages$;
    this.videos$ = movieDetailsService.videos$;
    this.trailerId$ = movieDetailsService.trailerId$;
    this.director$ = movieDetailsService.director$;
    this.isWatching$ = movieDetailsService.isWatching$;
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(res => {
        this.fromMovieList = res['closeable'] === 'true';
      });
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public playTrailer(): void {
    this.movieDetailsService.startWatching();
  }

  public stopTrailer(): void {
    this.movieDetailsService.stopWatching();
  }

  public close(): void {
    this.movieDetailsService.close();
  }
}
