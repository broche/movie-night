import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { SearchComponent } from './search/search.component';
import { GenreResolver } from './_services';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movie-search'
  },
  {
    path: 'movie-search',
    component: ListComponent,
    resolve: [GenreResolver]
  },
  {
    path: 'movie/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
