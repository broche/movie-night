import { Component, Input } from '@angular/core';
import { Movie } from '../../_shared/_models';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() size?: 'sm' | 'md' | 'lg' = 'md';
}
