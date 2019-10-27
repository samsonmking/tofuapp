import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user/user.service';
import { UserActionTypes, LoginRequest, LoginComplete, LoginFailed, LogoutRequest, LogoutComplete } from './user.actions';
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectRouterState, AppState } from '..';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserEffects {

    constructor(
        private actions$: Actions,
        private service: UserService,
        private store: Store<AppState>,
        private readonly router: Router
    ) {}

    @Effect()
    loginRequest$ = this.actions$.pipe(
        ofType<LoginRequest>(UserActionTypes.LoginRequest),
        switchMap(request => {
            return this.service.login(request.username, request.password).pipe(
                map((login: any) => new LoginComplete(login.user, login.auth)),
                catchError(err => of(new LoginFailed()))
            )
        }),
    );

    @Effect({ dispatch: false })
    loginComplete$ = this.actions$.pipe(
        ofType<LoginComplete>(UserActionTypes.LoginComplete),
        withLatestFrom(this.store.pipe(select(selectRouterState))),
        tap(([action, router]) => {
            const routerState = router.state;
            if(routerState && routerState.queryParams["return"]) {
                this.router.navigate([routerState.queryParams["return"]]);
            } else {
                this.router.navigate(["/"]);
            }
        })
    );

    @Effect()
    logoutRequest$ = this.actions$.pipe(
        ofType<LogoutRequest>(UserActionTypes.LogoutRequest),
        map(logout => new LogoutComplete())
    );

    @Effect({ dispatch: false })
    logoutComplete$ = this.actions$.pipe(
        ofType<LogoutComplete>(UserActionTypes.LogoutComplete),
        tap(_ => this.router.navigate(['/login']))
    );
}