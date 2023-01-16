import { TestBed } from '@angular/core/testing';

import { GenreResolver } from './genre.resolver';

describe('GenreResolver', () => {
  let resolver: GenreResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GenreResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
