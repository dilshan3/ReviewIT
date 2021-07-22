import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {tap} from "rxjs/operators";
import { Router } from "@angular/router";

import { UserService } from "../Services/user.service";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userService: UserService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        if(req.headers.get('noauth'))
            return next.handle(req.clone());
        else if(req.url.includes(environment.omdbApiUrl)) 
            return next.handle(req.clone());
        else if(req.url.includes(environment.sentimUrl)){
            
            const HEADERS = new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              });
            const clonedReq = req.clone({
                headers: HEADERS                
            });
            return next.handle(clonedReq).pipe(
                tap(
                    event => {},
                    err => {
                        if(err.error.auth == false){
                            this.router.navigateByUrl('/signin');
                        }
                    }
                )
            )
        }
        else{
            const clonedReq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            });
            return next.handle(clonedReq).pipe(
                tap(
                    event => {},
                    err => {
                        if(err.error.auth == false){
                            this.router.navigateByUrl('/signin');
                        }
                    }
                )
            )
        }
    }
}