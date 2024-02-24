import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { WatchProviderService } from './watch-provider.service';

@Injectable({
  providedIn: 'root'
})
export class WatchProviderResolver  {

  constructor(
    private readonly watchProviderService: WatchProviderService
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.watchProviderService.loadWatchProviders();

    return of(true);
  }
}
