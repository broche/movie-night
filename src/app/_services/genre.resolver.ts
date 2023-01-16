import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root'
})
export class GenreResolver implements Resolve<boolean> {

  constructor(
    private readonly movieService: MovieService
  ) {

  }
  
  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean> {
    this.movieService.loadGenres();

    return of(true);
  }
}
