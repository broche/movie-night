import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MovieDetailsService } from './_services/movie-details.service';

@Component({
  selector: 'app-find-movie',
  templateUrl: './find-movie.component.html',
  styleUrls: ['./find-movie.component.scss']
})
export class FindMovieComponent implements OnInit {
  @ViewChild('details', { static: true }) details?: MatSidenav;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly movieDetailsService: MovieDetailsService
  ) {
  }

  public ngOnInit(): void {
    this.movieDetailsService.setSidenav(this.details!);
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd && res.url === '/find-a-movie') {
        this.movieDetailsService.closeSidenav();
      }
    })
  }

  public destroySidenav(): void {
    this.router.navigate(['/find-a-movie', { outlets: { details: null }}]);
  }
}
