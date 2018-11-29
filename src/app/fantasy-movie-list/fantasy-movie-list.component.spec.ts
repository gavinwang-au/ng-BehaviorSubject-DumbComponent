import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyMovieListComponent } from './fantasy-movie-list.component';

describe('FantasyMovieListComponent', () => {
  let component: FantasyMovieListComponent;
  let fixture: ComponentFixture<FantasyMovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FantasyMovieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FantasyMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
