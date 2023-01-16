import { Component, Input } from '@angular/core';
import { Movie } from '../_models';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent {
  @Input() movie!: Movie;
}
