import { Component, Input } from '@angular/core';
import { Location, AsyncPipe, DatePipe } from '@angular/common';
import { filter, map, Observable } from 'rxjs';
import { Movie } from 'src/app/_shared/_models';
import { Image } from 'src/app/_shared/_models/image.model';
import { Person } from 'src/app/_shared/_models/person.model';
import { PersonDetailsService } from '../_services/person-details.service';
import { MovieDetailsService } from '../_services/movie-details.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { RouterLink } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-person-details',
    templateUrl: './person-details.component.html',
    styleUrls: ['./person-details.component.scss'],
    standalone: true,
    imports: [MatIcon, MatDivider, RouterLink, MovieCardComponent, AsyncPipe, DatePipe]
})
export class PersonDetailsComponent {

  public person$: Observable<Person | undefined>;
  public movieCredits$: Observable<Array<Movie> | undefined>;
  public images$: Observable<Array<Image> | undefined>;
  public backdrop$: Observable<string | undefined>;

  constructor(
    private readonly personDetailsService: PersonDetailsService,
    private readonly movieDetailsService: MovieDetailsService,
    protected readonly location: Location
  ) {
    this.person$ = personDetailsService.person$;
    this.movieCredits$ = personDetailsService.movieCredits$;
    this.images$ = personDetailsService.images$;
    this.backdrop$ = personDetailsService.movieCredits$
      .pipe(
        filter(a => !!a && a.length > 0),
        map(a => a![0]),
        map(a => a.backdrop)
      )
  }
}
