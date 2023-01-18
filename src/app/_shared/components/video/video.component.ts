import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { Subject, takeUntil } from 'rxjs';
import { Video } from '../../_models/video.model';

@Component({
  standalone: true,
  selector: 'app-video',
  imports: [YouTubePlayerModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {

  @Input() videoId!: string;
  @Input() autoplay: boolean = false;
  private _youtubePlayer?: YouTubePlayer;
  private readonly _unsubscribe$: Subject<void> = new Subject<void>();

  @ViewChild(YouTubePlayer) set content(youtubePlayer: YouTubePlayer) {
     if(youtubePlayer) { // initially setter gets called with undefined
         this._youtubePlayer = youtubePlayer;
         this._youtubePlayer.ready
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe(a => {
            if (this.autoplay) {
              this._youtubePlayer?.playVideo();
            }
          });
     }
  }

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
