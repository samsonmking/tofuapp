import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from './core-data/state';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { LoadUserRequest } from './core-data/state/user/user.actions';

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
    this.store.dispatch(new LoadUserRequest());

    // this.store.subscribe(console.log);
    // this.actions$.subscribe(console.log);
  }
}
