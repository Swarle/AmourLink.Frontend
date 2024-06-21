import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {LikesAndMatches} from "../../../models/likes-and-matches";

@Injectable({
  providedIn: 'root'
})
export class SwipeService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

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

  getLikesAndMatches(){
    return this.httpClient.get<LikesAndMatches>(this.baseUrl + '/swipe-service/swipe/likes-and-matches');
  }
}
