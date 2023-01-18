import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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
export class FindMovieComponent implements OnInit {
  @ViewChild('details', { static: true }) details?: MatSidenav;
  @ViewChild('filters', { static: true }) filters?: MatSidenav;
  public isWatching$: Observable<boolean>;
  private readonly _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly movieDetailsService: MovieDetailsService,
    private readonly personDetailsService: PersonDetailsService,
    private readonly breakpointObserver: BreakpointObserver
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
    
    this.breakpointObserver.observe(['(max-width: 1550px)', '(max-width: 1900px)'])
      .pipe(
        takeUntil(this._unsubscribe$),
        distinctUntilChanged()
      )
      .subscribe(res => {
        if (this.filters && this.details) {
          if (this.breakpointObserver.isMatched('(max-width: 1550px)')) {
            console.log('1');
            this.filters!.mode = 'over';
            this.filters?.close();
          } else if (this.breakpointObserver.isMatched('(max-width: 1900px)')) {
            console.log('2');
            this.filters!.mode = 'side';
            this.filters?.open();
            this.details!.mode = 'over';
          } else {
            console.log('3');
  
            this.details!.mode = 'side';
            // this.details?.open();
          }
        }
      });
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public destroySidenav(): void {
    this.router.navigate(['/find-a-movie', { outlets: { details: null }}]);
  }
}
