import { User } from '../../models/user/user';
import { Injectable } from '@angular/core';
import { ServicesModule } from '../services.module';
import { catchError, map } from 'rxjs/operators';
import { Observable, from, of, throwError } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({ providedIn: ServicesModule })
export class UserService {
    login(username: string, password: string): Observable<User> {
        return from(
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(() => firebase.auth().signInWithEmailAndPassword(username, password)))
                .pipe(
                    map(fbUser => {
                        return { id: fbUser.user.email } as User;
                    }),
                    catchError(e => {
                        return throwError({ code: e.code } as LoginError)
                    })
                );
    }

    logout() {
        return from(firebase.auth().signOut())
    }

    register(email: string, password: string) {
        return from(firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(() => firebase.auth().createUserWithEmailAndPassword(email, password)))
            .pipe(
                map(fbUser => {
                    return { id: fbUser.user.email } as User;
                }),
                catchError(e => {
                    return throwError({ code: e.code } as LoginError)
                })
            );
    }
}

export interface LoginError extends Error {
    code: 'auth/invalid-email' |
         'auth/user-disabled' |
         'auth/user-not-found' |
         'auth/wrong-password';
}

export interface RegisterServiceError extends Error {
    code: 'auth/email-already-in-use' |
        'auth/invalid-email' |
        'auth/operation-not-allowed' |
        'auth/weak-password';
}