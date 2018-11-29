import { Input, Component } from '@angular/core';
import { Movie } from '../movie';
@Component({
  selector: 'app-fantasy-movie-list',
  templateUrl: './fantasy-movie-list.component.html',
  styleUrls: ['./fantasy-movie-list.component.css']
})
export class FantasyMovieListComponent {
  @Input() movies: Movie[] [];
  @Input() allMovies: Movie[] [];

  constructor() {
  }
}
