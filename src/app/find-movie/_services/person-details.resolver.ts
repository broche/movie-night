import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { filter, map, Observable, of, tap } from 'rxjs';
import { PersonDetailsService } from './person-details.service';

@Injectable({
  providedIn: 'root'
})
export class PersonDetailsResolver implements Resolve<boolean> {

  constructor(
    private readonly personDetailsService: PersonDetailsService
  ) {

  }
  
  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean> {
    const personId = route.paramMap.get('id');
    if (personId) {
      this.personDetailsService.loadPersonById(personId);
      this.personDetailsService.openSidenav();
    }

    return of(false);
  }
}
