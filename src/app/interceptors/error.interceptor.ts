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
import {ApiResponse} from "../models/apiInfrastructure/apiResponse";
import {HttpErrorContent} from "../models/apiInfrastructure/httpErrorContent";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
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

// if (response && response.body?.responseType !== 'Success'){
//   if(response.body){
//     switch (response.status){
//       case 400:
//         if(response.body.responseType === 'ValidationError'){
//           throw new ValidationError(response.body.errorMessages, response.body.result);
//         }
//         else {
//           throw response.body.errorMessages
//         }
//       case 401:
//         //TODO: Delete jwt token when account service will be ready
//         this.router.navigateByUrl('');
//         break;
//       case 404:
//         throw new NotFoundError(response.body.errorMessages.get('default')!);
//       case 500:
//         //TODO: Make redirect to not found page when it will be ready
//         break;
//     }
//   }
// }
