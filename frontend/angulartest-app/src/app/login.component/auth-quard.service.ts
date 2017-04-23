import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { isDevMode } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    private hostname = (isDevMode()) ? 'http://localhost:8080' : window.location.origin;
    private headers = new Headers({'Content-Type': 'application/json'});
    private getUrl = this.hostname + '/hauapi/checktoken';

    constructor(private loginService: LoginService, private http: Http, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var item = localStorage.getItem('currentUser');
        var token = {token: ""};
        var currentUserString = localStorage.getItem('currentUser');
        var currentUser;

        if(currentUserString != null && currentUserString != "") {
            try {
                currentUser = JSON.parse(currentUserString);
                if(currentUser.token != null && currentUser.token != "") {
                    token.token = currentUser.token; 
                }
            } catch(e) {}
        }

        return this.http.post(this.getUrl, token, this.headers)
            .map((res: Response) => {

            if(res.json().status == 200) {
                return true;
            } else {
                this.router.navigate(["/sessionEnded"]);
                return false;
            }
        });
    }
}