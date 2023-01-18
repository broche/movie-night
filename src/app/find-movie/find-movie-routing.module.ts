import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreResolver } from '../_shared/_services';
import { WatchProviderResolver } from '../_shared/_services/watch-provider.resolver';
import { FindMovieComponent } from './find-movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { MovieDetailsResolver } from './_services/movie-details.resolver';
import { PersonDetailsResolver } from './_services/person-details.resolver';
const routes: Routes = [
  {
    path: '',
    component: FindMovieComponent,
    resolve: [
      GenreResolver,
      WatchProviderResolver
    ],
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
      },
      {
        path: 'person/:id',
        component: PersonDetailsComponent,
        resolve: {
          person: PersonDetailsResolver
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
