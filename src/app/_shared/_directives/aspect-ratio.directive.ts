import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAspectRatio]',
  standalone: true
})
export class AspectRatioDirective {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.adjustAspectRatio();
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustAspectRatio();
  }

  adjustAspectRatio() {
    const element = this.el.nativeElement;
    const width = element.offsetWidth;
    const height = (width / 16) * 9; // Calculate height for a 16:9 aspect ratio
    element.style.height = `${height}px`;
  }
}