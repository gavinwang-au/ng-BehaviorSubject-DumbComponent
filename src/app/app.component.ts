import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';
import { FantasyMovieService } from './fantasy-movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'behaviorSubject-Form';
  movies$: Observable<Movie[]>;

  constructor(public searchService: FantasyMovieService) {
  }

  ngOnInit() {
    // this.movies$ = this.searchService.getMovies();
  }

  /*
  doSearch(query: string) {
    this.searchService.search(query);
  }
  */
}
