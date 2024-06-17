import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpContext, HttpParams} from "@angular/common/http";
import {getMemberPaginatedResult} from "./memberPaginationHelper";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getMember(pageNumber: number = 1){
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);

    return getMemberPaginatedResult(this.baseUrl + '/recommendation-service/recommendation', params, this.httpClient);
  }

  like(receiverId: string){
    let params = new HttpParams();

    params = params.append('receiverId', receiverId);

    return this.httpClient.post(this.baseUrl + '/swipe-service/swipe/like', null, {params: params});
  }

  dislike(receiverId: string){
    let params = new HttpParams();

    params = params.append('receiverId', receiverId);

    return this.httpClient.post(this.baseUrl + '/swipe-service/swipe/dislike', null, {params: params});
  }
}
