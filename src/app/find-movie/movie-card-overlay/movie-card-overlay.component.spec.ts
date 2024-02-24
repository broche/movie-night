import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardOverlayComponent } from './movie-card-overlay.component';

describe('MovieCardOverlayComponent', () => {
  let component: MovieCardOverlayComponent;
  let fixture: ComponentFixture<MovieCardOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MovieCardOverlayComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(MovieCardOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
