import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SocialUser} from "@abacritt/angularx-social-login";
import {UserLogin} from "../models/userLogin";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  verifyGoogleIdToken(tokenId: string){
    //TODO:Change url when endpoint will be ready
    return this.httpClient.post(this.baseUrl + 'userService/account/verifyTokenId', tokenId);
  }

  loginWithFacebook(user: SocialUser){
    //TODO:Make method when endpoint will be
    console.log();
  }

  loginWithUserInfo(user: UserLogin){
    return this.httpClient.post(this.baseUrl + 'userService/account/login', user);
  }
}
