import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-fantasy-movie-search',
  templateUrl: './fantasy-movie-search.component.html',
  styleUrls: ['./fantasy-movie-search.component.css']
})
export class FantasyMovieSearchComponent implements OnInit {
  searchForm: FormGroup;
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchText: ''
    });

    this.searchForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(formValue => formValue.searchText)
    ).subscribe(this.onSearch);
  }
}
