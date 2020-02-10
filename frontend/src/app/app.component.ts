import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from './core-data/state';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    private readonly store: Store<AppState>,
    private readonly actions$: Actions
  ) {
  }

  ngOnInit(): void {
    // this.actions$.subscribe(console.log);
    // this.store.subscribe(console.log);
  }
}
