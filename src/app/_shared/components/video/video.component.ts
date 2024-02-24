import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { YOUTUBE_PLAYER_CONFIG, YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { Subject, takeUntil } from 'rxjs';
import { Video } from '../../_models/video.model';
import { AspectRatioDirective } from '../../_directives/aspect-ratio.directive';
import { MovieDetailsService } from 'src/app/find-movie/_services/movie-details.service';

@Component({
  standalone: true,
  selector: 'app-video',
  imports: [
    YouTubePlayerModule,
    AspectRatioDirective
  ],
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
export class VideoComponent implements OnInit, OnDestroy {

  @Input() videoId!: string;
  @Input() autoplay: boolean = false;
  @Input() width: string = '100%';
  @ViewChild(YouTubePlayer) player?: YouTubePlayer;
  protected height: string = '';
  private readonly _unsubscribe$: Subject<void> = new Subject<void>();
  private _initialized: boolean = false;

  constructor(
    private readonly _movieDetailsService: MovieDetailsService,
    private readonly _elementRef: ElementRef
  ) {
    
  }

  public ngOnInit() {
    
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    const aspectRatio = 9 / 16;
    const overlayWidth = this._elementRef.nativeElement.offsetWidth; // Ensure you have a reference to your overlay element
    this.height = `${overlayWidth * aspectRatio}px`;

    this.player?.seekTo(this._movieDetailsService.videoPlayerTimeStamp ?? 0, true);
  }

  public ngOnDestroy(): void {
    this._movieDetailsService.setCurrentTime(this.player?.getCurrentTime() || 0);
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
  
  public onReady(event: YT.PlayerEvent): void {
    this.player?.seekTo(this._movieDetailsService.videoPlayerTimeStamp ?? 0, true);
  }

  public onStateChange(event: YT.OnStateChangeEvent): void {
    if (!this._initialized) {
      this._initialized = true;
      this.player?.seekTo(this._movieDetailsService.videoPlayerTimeStamp ?? 0, true);
    }
  }
}
