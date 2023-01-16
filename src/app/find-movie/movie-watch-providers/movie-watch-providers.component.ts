import { Component, Input } from '@angular/core';
import { WatchProvider } from 'src/app/_shared/_models/watch-provider.model';

@Component({
  selector: 'app-movie-watch-providers',
  templateUrl: './movie-watch-providers.component.html',
  styleUrls: ['./movie-watch-providers.component.scss']
})
export class MovieWatchProviderComponent {
  @Input() watchProviders: Array<WatchProvider> | null | undefined;
}
