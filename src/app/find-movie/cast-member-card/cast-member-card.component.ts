import { Component, Input } from '@angular/core';
import { MovieCredit } from 'src/app/_shared/_models/movie-credit.model';

@Component({
  selector: 'app-cast-member-card',
  templateUrl: './cast-member-card.component.html',
  styleUrls: ['./cast-member-card.component.scss']
})
export class CastMemberCardComponent {
  @Input() credit!: MovieCredit;
  @Input() size?: 'sm' | 'md' | 'lg' = 'md';
}
