import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, AsyncSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, withLatestFrom} from 'rxjs/operators';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class FantasyMovieService {
  private _searchKeywordSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchKeyword$: Observable<string> = this._searchKeywordSubject.asObservable();
  private cache = new Map<string, Observable<Movie[]>>();
  constructor(private http: HttpClient) {
  }

  public getMovies(): Observable<Movie[]> {
    const url = 'assets/movies.json';
    if (!this.cache.has(url)) {
      this.cache.set(url, this.fetchMovies(url));
    }
    return this.cache.get(url);
  }

  public getFilteredMovies() {
    return this.getMovies()
      .pipe(
        withLatestFrom(this.searchKeyword$),
        map(([movies, keyword]) => {
          return movies.filter(movie => movie && movie.tag.includes(keyword));
        })
      );
  }

  private fetchMovies(url: string): Observable<Movie[]> {
    const subject = new AsyncSubject<Movie[]>();
    this.http
      .get<Movie[]>(url)
      .subscribe(subject);
    return subject.asObservable();
  }

  search(query: string) {
    this._searchKeywordSubject.next(query);
  }
}
