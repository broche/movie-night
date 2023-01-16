import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { GenreService } from './genre.service';

@Injectable({
  providedIn: 'root'
})
export class GenreResolver implements Resolve<boolean> {

  constructor(
    private readonly genreService: GenreService
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.genreService.loadGenres();

    return of(true);
  }
}
