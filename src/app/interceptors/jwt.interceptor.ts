import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3YTJiZmExNS05MTcxLTRkYjktO' +
      'DA4ZC1jMGQwNmUyNTc1NTkiLCJuYW1lIjoiQ2FuZGllIEdyZWd1b2wiLCJpYXQiOjE1MTYyMzkwMjJ9.tUAeKHfwe8vADM230Mmj4dgVJHGtlakxsuKUISI57GA';

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next.handle(request);
  }
}
