import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    private headers: Headers = new Headers();

    constructor(private loginService: LoginService, private http: Http, private router: Router) {
        this.headers.append('Content-Type', 'application/json');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var token = {
            token: JSON.parse(localStorage.getItem('currentUser')).token
        };
        console.log(token);
        return this.http.post('http://localhost:8080/checktoken', token, this.headers)
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