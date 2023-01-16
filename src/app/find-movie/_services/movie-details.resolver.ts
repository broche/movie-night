import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { filter, map, Observable, of, tap } from 'rxjs';
import { MovieDetailsService } from './movie-details.service';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsResolver implements Resolve<boolean> {

  constructor(
    private readonly movieDetailsService: MovieDetailsService
  ) {

  }
  
  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean> {
    const movieId = route.paramMap.get('id');
    if (movieId) {
      this.movieDetailsService.loadMovieById(movieId);
      this.movieDetailsService.openSidenav();
    }

    return of(false);
  }
}
