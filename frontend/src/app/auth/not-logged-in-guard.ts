import { Injectable } from "@angular/core";
import { AuthModule } from './auth.module';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserFacade } from '../core-data/state/user/user.facade';
import { tap, map } from 'rxjs/operators';

@Injectable({ providedIn: AuthModule })
export class NotLoggedInGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly userFacade: UserFacade) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.userFacade.loggedIn$.pipe(
            map(loggedIn => !loggedIn),
            tap(loggedOut => {
                if (!loggedOut) {
                    if (state.url === '/login') {
                        this.router.navigate(['/recipes']);
                    }
                }
            })
        )
    }
}
