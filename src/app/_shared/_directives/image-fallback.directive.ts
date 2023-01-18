import {Directive, Input, HostBinding} from '@angular/core'
@Directive({
    selector: 'img[default]',
    host: {
      '(error)':'updateUrl()',
      '(load)': 'load()',
      '[src]':'src'
     }
  })
  
 export class ImageFallbackDirective {
    @Input() src!:string;
    @Input() default!:string;
    @HostBinding('class') className?: string;
  
    updateUrl() {
      this.src = this.default;
    }
    load(){
      this.className = 'image-loaded';
    }
  }