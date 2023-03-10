import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, map, Observable, Subject, takeUntil, tap, zip } from 'rxjs';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { MovieDetailsService } from './_services/movie-details.service';
import { PersonDetailsService } from './_services/person-details.service';

@Component({
  selector: 'app-find-movie',
  templateUrl: './find-movie.component.html',
  styleUrls: ['./find-movie.component.scss']
})
export class FindMovieComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('details', { static: true }) details?: MatSidenav;
  @ViewChild('filters', { static: true }) filters?: MatSidenav;
  public detailsMode: MatDrawerMode = 'side';
  public filtersMode: MatDrawerMode = 'side';
  public isWatching$: Observable<boolean>;
  private readonly _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly movieDetailsService: MovieDetailsService,
    private readonly personDetailsService: PersonDetailsService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.isWatching$ = movieDetailsService.isWatching$;
  }

  public ngOnInit(): void {
    this.movieDetailsService.setSidenav(this.details!);
    this.personDetailsService.setSidenav(this.details!);
    this.router.events
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(res => {
        if (res instanceof NavigationEnd && res.url === '/find-a-movie') {
          this.movieDetailsService.close();
        }
      });
    
    this.breakpointObserver.observe(['(max-width: 1600px)', '(max-width: 1900px)'])
      .pipe(
        takeUntil(this._unsubscribe$),
        distinctUntilChanged()
      )
      .subscribe(res => {
        if (this.breakpointObserver.isMatched('(max-width: 1600px)')) {
          console.log('1');
          this.detailsMode = 'over';
          this.filtersMode = 'over';
        } else if (this.breakpointObserver.isMatched('(max-width: 1900px)')) {
          console.log('2');
          this.detailsMode = 'side';
          this.filtersMode = 'over';
          this.filters?.close();
        } else {
          console.log('3');
          this.detailsMode = 'side';
          this.filtersMode = 'side';
          this.filters?.open();
        }
        this._updateModes();
      });
  }

  public ngAfterViewInit(): void {
    this._updateModes();
    this.cdr.detectChanges();
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public destroySidenav(): void {
    this.router.navigate(['/find-a-movie', { outlets: { details: null }}]);
  }

  private _updateModes(): void {
    if (this.filters && this.details) {
      this.details!.mode = this.detailsMode;
      this.filters!.mode = this.filtersMode;
    }
  }
}
