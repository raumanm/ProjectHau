import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class AuthGuard implements CanActivate {

    private headers: Headers = new Headers();

    constructor(private loginService: LoginService, private http: Http) {
        this.headers.append('Content-Type', 'application/json');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return false;
    }

    authenticateToken(token) {
        this.http.post('http://localhost:8080/checktoken', token, this.headers)
            .map((res: Response) => {
                
                let token = res.json().data.token;
                if (token) {
                    let currentUser = {
                        _id: res.json().data.userId,
                        token : token,
                        accessLevel: res.json().data.accessLevel
                    };
                    this.token = JSON.stringify(currentUser);
                    localStorage.setItem('currentUser', token);
                    return true;
                } else {
                    return false;
                }
            });
    }
}