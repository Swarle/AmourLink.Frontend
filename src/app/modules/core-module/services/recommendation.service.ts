import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {getMemberPaginatedResult} from "./member-pagination-helper";
import {SessionService} from "./session.service";


@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  getMember(pageNumber: number = 1){
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);

    return getMemberPaginatedResult(this.baseUrl + '/recommendation-service/recommendation',
      params, this.httpClient, this.sessionService);
  }
}
