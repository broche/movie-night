import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { YOUTUBE_PLAYER_CONFIG, YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { Subject, takeUntil } from 'rxjs';
import { Video } from '../../_models/video.model';

@Component({
  standalone: true,
  selector: 'app-video',
  imports: [YouTubePlayerModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  providers: [{
    provide: YOUTUBE_PLAYER_CONFIG,
    useValue: {
      loadApi: false,
      autoplay: 1
    }
  }]
})
export class VideoComponent implements OnInit {

  @Input() videoId!: string;
  @Input() autoplay: boolean = false;
  private _youtubePlayer?: YouTubePlayer;
  private readonly _unsubscribe$: Subject<void> = new Subject<void>();

  public ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  public ngOnDestory(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
