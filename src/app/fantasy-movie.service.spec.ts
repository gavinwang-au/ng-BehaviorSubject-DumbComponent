import { TestBed } from '@angular/core/testing';

import { FantasyMovieService } from './fantasy-movie.service';

describe('FantasyMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FantasyMovieService = TestBed.get(FantasyMovieService);
    expect(service).toBeTruthy();
  });
});
