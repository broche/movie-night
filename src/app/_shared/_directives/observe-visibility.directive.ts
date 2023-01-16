import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, delay, filter } from 'rxjs';

@Directive({
  selector: '[appObserveVisibility]'
})
export class ObserveVisibilityDirective implements OnDestroy, OnInit, AfterViewInit {
  @Input() options = {};
  @Output() visible = new EventEmitter();
  private observer: IntersectionObserver;

  constructor(private readonly element: ElementRef) {
    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.visible.emit();
    }, {
      rootMargin: '0px',
      // threshold: 1,
    });

    this.observer.observe(this.element.nativeElement);
  }
  ngOnInit() { }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
