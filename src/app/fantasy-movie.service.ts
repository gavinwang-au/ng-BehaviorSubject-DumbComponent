import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, AsyncSubject, of} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, skip, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import { Movie } from './movie';
import {query} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class FantasyMovieService {
  private _searchKeywordSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchKeyword$: Observable<string> = this._searchKeywordSubject.asObservable();
  private cache = new Map<string, Observable<Movie[]>>();
  constructor(private http: HttpClient) {
  }

  public getMovies(queryString: string): Observable<Movie[]> {
    const url = `assets/movies.json?q=${queryString}`;
    if (!this.cache.has(url)) {
      this.cache.set(url, this.fetchMovies(url));
    }
    return this.cache.get(url);
  }

  public getFilteredMovies() {
    return this.searchKeyword$
      .pipe(
        switchMap((queryString: string) => {
          const nextSearch$ = this.searchKeyword$.pipe(skip(1));
          return this.getMovies(queryString).pipe(takeUntil(nextSearch$));
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
