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

  refreshAccessToken(refreshToken: string){
    this.httpClient.post<LoginResponse>(this.baseUrl + '/security-service/login/refresh-token',
      {refresh_token: refreshToken}).pipe(take(1)).subscribe({
      next: response => {
        this.setCurrentUser(response);
      }
    })
  }



  loginWithGoogle(tokenId: string){
    return this.httpClient.post<LoginResponse>(this.baseUrl + '/security-service/login/google', tokenId).pipe(
      map((response) => {
        this.setCurrentUser(response);
      })
    );
  }

  loginWithFacebook(authToken: string){
    return this.httpClient.post(this.baseUrl + '/security-service/login/facebook', authToken);
  }

  loginWithUserInfo(user: UserLogin){
    return this.httpClient.post<LoginResponse>(this.baseUrl + '/security-service/login', user).pipe(
      map((response) => {
          this.setCurrentUser(response);
      })
    );
  }

  registerWithUserInfo(user: UserRegister){
    return this.httpClient.post(this.baseUrl + '/security-service/users/add', user);
  }

  setCurrentUser(loginResponse: LoginResponse){
    const tokenObj = this.getDecodedToken(loginResponse.access_token);
    const user: User = {
      id: tokenObj.jti,
      email: tokenObj.sub,
      roles: tokenObj.roles,
      enabled: tokenObj.enabled,
      token: loginResponse.access_token,
      accessTokenExpired: this.getTokenExpirationDate(tokenObj.exp),
      refreshToken: loginResponse.refresh_token,
      name: tokenObj.name
    };

    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  clearCurrentUser(){
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
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
