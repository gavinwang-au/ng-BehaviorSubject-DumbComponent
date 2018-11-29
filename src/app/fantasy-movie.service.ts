import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntil, switchMap, map, tap } from 'rxjs/operators';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class FantasyMovieService {
  private url = 'assets/movies.json';
  private movies: Movie[];

  private _searchKeywordSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchKeyword$: Observable<string> = this._searchKeywordSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return this._searchKeywordSubject.asObservable().pipe(
      switchMap(searchKeyword => {
        if (this.movies) {
          return of(this.movies.filter(movie => movie.tag === searchKeyword));
        } else {
          return this.http.get<Movie[]>(this.url).pipe(
            tap(movies => this.movies = movies),
            map(movies => movies.filter(movie => movie.tag === searchKeyword)),
          );
        }
      })
    );
  }

  search(query: string) {
    this._searchKeywordSubject.next(query);
  }
}
