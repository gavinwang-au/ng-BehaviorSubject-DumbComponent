import { Input, Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { FantasyMovieService } from '../fantasy-movie.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-fantasy-movie-list',
  templateUrl: './fantasy-movie-list.component.html',
  styleUrls: ['./fantasy-movie-list.component.css']
})
export class FantasyMovieListComponent {
  @Input() movies$: Observable<Movie[]>;

  constructor() { }
}
