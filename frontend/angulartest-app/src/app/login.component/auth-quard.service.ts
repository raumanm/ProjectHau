import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return false;
    }
}