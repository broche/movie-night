import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreResolver } from '../_shared/_services';
import { FindMovieComponent } from './find-movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsResolver } from './_services/movie-details.resolver';
const routes: Routes = [
  {
    path: '',
    component: FindMovieComponent,
    resolve: [GenreResolver],
    children: [
      {
        path: '',
        component: MovieListComponent
      },
      
      {
        path: 'movie/:id',
        component: MovieDetailsComponent,
        resolve: {
          movie: MovieDetailsResolver
        },
        outlet: 'details'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindMovieRoutingModule { }
