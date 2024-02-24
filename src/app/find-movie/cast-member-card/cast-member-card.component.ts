import { Component, Input } from '@angular/core';
import { MovieCredit } from 'src/app/_shared/_models/movie-credit.model';
import { MatTooltip } from '@angular/material/tooltip';
import { MatCardImage } from '@angular/material/card';
import { ImageFallbackDirective } from '../../_shared/_directives/image-fallback.directive';

@Component({
    selector: 'app-cast-member-card',
    templateUrl: './cast-member-card.component.html',
    styleUrls: ['./cast-member-card.component.scss'],
    standalone: true,
    imports: [ImageFallbackDirective, MatCardImage, MatTooltip]
})
export class CastMemberCardComponent {
  @Input() credit?: MovieCredit;
  @Input() size?: 'sm' | 'md' | 'lg' = 'md';
}
