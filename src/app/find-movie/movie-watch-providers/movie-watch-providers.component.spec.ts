import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieWatchProviderComponent } from './movie-watch-providers.component';

describe('MovieWatchProviderComponent', () => {
  let component: MovieWatchProviderComponent;
  let fixture: ComponentFixture<MovieWatchProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieWatchProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieWatchProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
