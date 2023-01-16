import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'find-a-movie'
  },
  {
    path: 'find-a-movie',
    loadChildren: () => import('./find-movie/find-movie.module').then(m => m.FindMovieModule)
  },
  // {
  //   path: 'random',
  //   component: MovieSearchComponent,
  //   resolve: [GenreResolver]
  // },
  // {
  //   path: 'connections',
  //   component: MovieSearchComponent,
  //   resolve: [GenreResolver]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
