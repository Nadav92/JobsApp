import { AccountService } from './../services/account.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { User } from '../models/User';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private account: AccountService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let currenteUser: User = { token: '', username: '' };

        this.account.currentUser$.pipe(take(1)).subscribe((user: User | null) => { if (user) currenteUser = user });
        if (currenteUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currenteUser.token}`
                }
            })
        }
        return next.handle(request)


    }
}
