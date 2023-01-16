import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MovieDetailsService } from './_services/movie-details.service';

@Component({
  selector: 'app-find-movie',
  templateUrl: './find-movie.component.html',
  styleUrls: ['./find-movie.component.scss']
})
export class FindMovieComponent implements AfterViewInit {
  @ViewChild('details', { static: true }) details?: MatSidenav;

  constructor(
    private readonly router: Router,
    private readonly movieDetailsService: MovieDetailsService
  ) {
  }

  public ngAfterViewInit(): void {
    this.movieDetailsService.setSidenav(this.details!);
  }

  public destroySidenav(): void {
    this.router.navigate(['/find-a-movie', { outlets: { details: null }}]);
  }
}
