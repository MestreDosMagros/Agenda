import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authenticationService.user_autenticated())
            return true;

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}