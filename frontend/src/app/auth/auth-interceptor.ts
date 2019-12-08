import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY, of } from 'rxjs';
import { UserFacade } from '../core-data/state/user/user.facade';
import { Injectable } from '@angular/core';
import { map, switchMap, take, catchError } from 'rxjs/operators';
import { AuthModule } from './auth.module';
import { Router } from '@angular/router';

@Injectable({ providedIn: AuthModule })
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private readonly userFacade: UserFacade,
        ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.userFacade.user$.pipe(
            take(1),
            switchMap(user => {
                return user.loggedIn ? next.handle(this.addToken(req, user.auth.token)) : next.handle(req)
            }),
            catchError((error) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    this.userFacade.logout();
                }
                throw error;
            })
        )
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}