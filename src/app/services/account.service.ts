import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  verifyIdToken(tokenId: string){
    //TODO:Change url when endpoint will be ready
    this.httpClient.post(this.baseUrl + 'user/account/verifyTokenId', tokenId);
  }
}
