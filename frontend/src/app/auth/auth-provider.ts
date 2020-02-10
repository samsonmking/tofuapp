import { Injectable } from '@angular/core';
import { AppState } from '../core-data/state';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { LoadUserComplete, LoadUserFailed } from '../core-data/state/user/user.actions';
import { environment } from '../../environments/environment';
const { firebaseConfig } = environment;

@Injectable()
export class AuthProvider {
    constructor(private readonly store: Store<AppState>) {

    }

    load() {
        firebase.initializeApp(firebaseConfig);

        return new Promise((resolve, reject) => {
            const unsubscribe = firebase.auth().onAuthStateChanged(
                auth => { resolve(auth); unsubscribe(); },
                error => { reject(error); unsubscribe(); }
            )
        })
        .then((u: firebase.User) => this.store.dispatch(new LoadUserComplete({ user: { id: u.email } })))
        .catch(error => this.store.dispatch(new LoadUserFailed()));
    }
}