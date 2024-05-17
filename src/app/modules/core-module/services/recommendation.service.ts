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
}
