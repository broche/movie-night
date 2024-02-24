import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GenreService } from './genre.service';

@Injectable({
  providedIn: 'root'
})
export class GenreResolver  {

  constructor(
    private readonly genreService: GenreService
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.genreService.loadGenres();

    return of(true);
  }
}
