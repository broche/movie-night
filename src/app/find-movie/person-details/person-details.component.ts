import { Component, Input } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Movie } from 'src/app/_shared/_models';
import { Image } from 'src/app/_shared/_models/image.model';
import { Person } from 'src/app/_shared/_models/person.model';
import { PersonDetailsService } from '../_services/person-details.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent {

  public person$: Observable<Person | undefined>;
  public movieCredits$: Observable<Array<Movie> | undefined>;
  public images$: Observable<Array<Image> | undefined>;
  public backdrop$: Observable<string | undefined>;

  constructor(
    private readonly personDetailsService: PersonDetailsService
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
