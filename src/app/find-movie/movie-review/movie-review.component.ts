import { Component, Input } from '@angular/core';
import { WatchProvider } from 'src/app/_shared/_models/watch-provider.model';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss']
})
export class MovieReviewComponent {
  @Input() watchProviders: Array<WatchProvider> | null | undefined;
}
