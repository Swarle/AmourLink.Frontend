import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../models/user-models/user-login";
import {UserRegister} from "../models/user-models/user-register";
import {BehaviorSubject, map, Observable, take} from "rxjs";
import {User} from "../models/user-models/user";
import {Token} from "../models/api-infrastructure/token";
import {ApiResponse} from "../models/api-infrastructure/api-response";
import {LoginResponse} from "../models/login-response";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource: BehaviorSubject<User | undefined>;
  currentUser$: Observable<User | undefined>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSource = new BehaviorSubject<User | undefined>(JSON.parse(localStorage.getItem('user')!));
    this.currentUser$ = this.currentUserSource.asObservable();
  }

  loginWithGoogle(tokenId: string){
    console.log(tokenId)
    return this.httpClient.post<LoginResponse>(this.baseUrl + '/security-service/login/google', tokenId).pipe(
      map((response) => {
        this.setCurrentUser(response);
      })
    );
  }

  loginWithFacebook(authToken: string){
    //TODO:Make method when endpoint will be
    return this.httpClient.post(this.baseUrl + 'security-service/account/login-with-facebook', authToken);
  }

  loginWithUserInfo(user: UserLogin){
    return this.httpClient.post<LoginResponse>(this.baseUrl + '/security-service/login', user).pipe(
      map((response) => {
          this.setCurrentUser(response);
      })
    );
  }

  registerWithUserInfo(user: UserRegister){
    //TODO:Pipe response
    return this.httpClient.post(this.baseUrl + 'security-service/account/register', user);
  }

  setCurrentUser(loginResponse: LoginResponse){
    const tokenObj = this.getDecodedToken(loginResponse.access_token);
    const user: User = {
      id: tokenObj.jti,
      email: tokenObj.sub,
      roles: tokenObj.roles,
      token: loginResponse.access_token,
      accessTokenExpired: this.getTokenExpirationDate(tokenObj.exp),
      refreshToken: loginResponse.access_token,
      name: tokenObj.name
    };

    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getTokenExpirationDate(expired: number): Date {
      const date = new Date(0);
      date.setUTCSeconds(expired);
      return date;
  }

  getDecodedToken(token: string): Token{
    return JSON.parse(atob(token.split('.')[1]));
  }

}
