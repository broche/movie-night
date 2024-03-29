import { NgModule } from '@angular/core';
import { MovieFiltersComponent } from './movie-filters/movie-filters.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { ObserveVisibilityDirective } from '../_shared/_directives/observe-visibility.directive';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieRatingPillComponent } from './movie-rating-pill/movie-rating-pill.component';
import { FindMovieComponent } from './find-movie.component';
import { FindMovieRoutingModule } from './find-movie-routing.module';
import { MovieWatchProviderComponent } from './movie-watch-providers/movie-watch-providers.component';
import { CastMemberCardComponent } from './cast-member-card/cast-member-card.component';
import { VideoComponent } from '../_shared/components/video/video.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { ImageFallbackDirective } from '../_shared/_directives/image-fallback.directive';

@NgModule({
  declarations: [
    CastMemberCardComponent,
    PersonDetailsComponent,
    MovieFiltersComponent,
    MovieListComponent,
    FindMovieComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    MovieRatingPillComponent,
    MovieWatchProviderComponent
  ],
  imports: [
    VideoComponent,
    FindMovieRoutingModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTooltipModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    ReactiveFormsModule,
    
    ObserveVisibilityDirective,
    ImageFallbackDirective,
  ],
  providers: []
})
export class FindMovieModule { }
