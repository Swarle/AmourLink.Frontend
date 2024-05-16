import { Injectable } from '@angular/core';
import {Member} from "../../../models/userModels/member";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpContext, HttpParams} from "@angular/common/http";
import {ApiResponse} from "../../../models/apiInfrastructure/apiResponse";
import {catchError, map, pipe} from "rxjs";
import {HttpErrorContent} from "../../../models/apiInfrastructure/httpErrorContent";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getMember(pageNumber: number = 1){
    let params = new HttpParams();

    if(pageNumber){
      params.append('pageNumber', pageNumber);
    }

    return this.httpClient.get<ApiResponse<Member>>(this.baseUrl + '/recommendation-service/recommendation',
      {headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3YTJiZmEx' +
            'NS05MTcxLTRkYjktODA4ZC1jMGQwNmUyNTc1NTkiLCJuYW1lIjoiQ2FuZGllIEdyZWd1b2wiLCJpYXQiOjE1MTYyMzkwMjJ9.tUAeKHfwe8vADM230Mmj4dgVJHGtlakxsuKUISI57GA'},
      params: params}).pipe(
      map(response => {
        console.log(response);
        return response.result;
      }),

    );
  }
}
