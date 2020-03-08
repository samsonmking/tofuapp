import { Injectable } from "@angular/core";
import { AuthModule } from './auth.module';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserFacade } from '../core-data/state/user/user.facade';
import { tap } from 'rxjs/operators';
import { getRouteUrl, RoutePaths } from '../shared/routes';

@Injectable({ providedIn: AuthModule })
export class LoggedInGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly userFacade: UserFacade) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.userFacade.loggedIn$.pipe(
            tap(loggedIn => {
                if (!loggedIn) {
                    this.router.navigate([getRouteUrl(RoutePaths.Login)], {
                        queryParams: {
                            return: state.url
                        }
                    });
                }
            })
        )
    }
}
