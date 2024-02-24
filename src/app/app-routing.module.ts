import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'find-a-movie'
  },
  {
    path: 'find-a-movie',
    loadChildren: () => import('./find-movie/find-movie.module').then(m => m.FindMovieModule)
  },
];
