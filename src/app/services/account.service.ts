import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../models/userModels/userLogin";
import {UserRegister} from "../models/userModels/userRegister";

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

  loginWithFacebook(authToken: string){
    //TODO:Make method when endpoint will be
    return this.httpClient.post(this.baseUrl + 'userService/account/login-with-facebook', authToken);
  }

  loginWithUserInfo(user: UserLogin){
    //TODO:Pipe response
    return this.httpClient.post(this.baseUrl + 'userService/account/login', user);
  }

  registerWithUserInfo(user: UserRegister){
    //TODO:Pipe response
    return this.httpClient.post(this.baseUrl + 'usersService/account/register', user);
  }

}
