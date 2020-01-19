import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user/user.service';
import { 
    UserActionTypes,
    LoginRequest,
    LoginComplete, 
    LogoutRequest,
    LogoutComplete,
    LoadUserRequest,
    LoadUserComplete,
    LoadUserFailed,
    LoginUsernameFailed,
    LoginPasswordFailed
} from './user.actions';
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectRouterState, AppState } from '..';
import { of } from 'rxjs';
import { RemoveRecipesFromStore } from '../recipe/recipes.actions';
import { RemoveIngredientsFromStore } from '../ingredient/ingredient.actions';
import { RemoveListsFromStore } from '../shopping-list/shopping-list.actions';
import { RemoveListItemsFromStore } from '../shopping-list-item/shopping-list-items.actions';
import { UserStorage } from '../../services/user/user-storage';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserEffects {

    constructor(
        private actions$: Actions,
        private service: UserService,
        private readonly userStorage: UserStorage,
        private store: Store<AppState>,
        private readonly router: Router
    ) {}

    @Effect()
    loginRequest$ = this.actions$.pipe(
        ofType<LoginRequest>(UserActionTypes.LoginRequest),
        switchMap(request => {
            return this.service.login(request.username, request.password).pipe(
                map((login) => new LoginComplete(login.user, login.auth)),
                catchError((err: HttpErrorResponse) => 
                    err.status === 404 ? of(new LoginUsernameFailed()) : of(new LoginPasswordFailed()))
            )
        }),
    );

    @Effect({ dispatch: false })
    loginComplete$ = this.actions$.pipe(
        ofType<LoginComplete>(UserActionTypes.LoginComplete),
        withLatestFrom(this.store.pipe(select(selectRouterState))),
        tap(([_, router]) => {
            const routerState = router.state;
            if(routerState && routerState.queryParams["return"]) {
                this.router.navigate([routerState.queryParams["return"]]);
            } else {
                this.router.navigate(["/recipes"]);
            }
        }),
        tap(([action, _]) => this.userStorage.saveUser({ user: action.user, auth: action.auth }))
    );

    @Effect()
    logoutRequest$ = this.actions$.pipe(
        ofType<LogoutRequest>(UserActionTypes.LogoutRequest),
        tap(_ => this.userStorage.clear()),
        map(_ => new LogoutComplete())
    );

    @Effect()
    logoutComplete$ = this.actions$.pipe(
        ofType<LogoutComplete>(UserActionTypes.LogoutComplete),
        tap(_ => this.router.navigate(['/login'])),
        switchMap(_ => [
            new RemoveRecipesFromStore(),
            new RemoveIngredientsFromStore(),
            new RemoveListsFromStore(),
            new RemoveListItemsFromStore()
        ])
    );

    @Effect()
    loadUserRequest$ = this.actions$.pipe(
        ofType<LoadUserRequest>(UserActionTypes.LoadUserRequest),
        map(_ => {
            const existing = this.userStorage.getUser();
            return existing ? new LoadUserComplete(existing) : new LoadUserFailed()
        })
    );
}