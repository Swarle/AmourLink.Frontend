import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, map, Observable, tap} from 'rxjs';
import {Router} from "@angular/router";
import {ApiResponse} from "../models/api-infrastructure/api-response";
import {HttpErrorContent} from "../models/api-infrastructure/http-error-content";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event  ) => {
        if(event instanceof HttpResponse){
          const apiResponse: ApiResponse<any> = event.body;
          if(apiResponse && apiResponse.result !== undefined)
            return event.clone({body: apiResponse.result})
        }

        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        switch (err.status){
          case 401:
            //TODO: Delete jwt token when account service will be ready
            this.router.navigateByUrl('');
            break;
          case 500:
          //TODO: Make redirect to not found page when it will be ready
            break;
        }

        const body: ApiResponse<any> = JSON.parse(JSON.stringify(err.error));
        throw new HttpErrorContent<any>(body, err.status);
      })
      );
  }
}

