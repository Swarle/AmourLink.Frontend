import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {AccountService} from "../services/account.service";
import {environment} from "../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          if(!request.url.includes('security-service/login') &&
            request.url.includes(environment.apiUrl) && !request.url.includes('university')){
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${user.token}`
              }
            });
          }
        }
      }
    });

    return next.handle(request);
  }
}
