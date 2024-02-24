import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRatingPillComponent } from './movie-rating-pill.component';

describe('MovieRatingPillComponent', () => {
  let component: MovieRatingPillComponent;
  let fixture: ComponentFixture<MovieRatingPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MovieRatingPillComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(MovieRatingPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
