import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { WatchProviderService } from './watch-provider.service';

@Injectable({
  providedIn: 'root'
})
export class WatchProviderResolver implements Resolve<boolean> {

  constructor(
    private readonly watchProviderService: WatchProviderService
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.watchProviderService.loadWatchProviders();

    return of(true);
  }
}
