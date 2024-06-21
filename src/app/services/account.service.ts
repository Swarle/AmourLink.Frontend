import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../models/user-models/userLogin";
import {UserRegister} from "../models/user-models/userRegister";
import {BehaviorSubject, map, Observable, take} from "rxjs";
import {User} from "../models/user-models/user";
import {Token} from "../models/api-infrastructure/token";
import {ApiResponse} from "../models/api-infrastructure/api-response";

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
    return this.httpClient.post<string>(this.baseUrl + '/security-service/login/google', tokenId).pipe(
      map((token) => {
        if(token){
          this.setCurrentUser(token);
        }
      })
    );
  }

  loginWithFacebook(authToken: string){
    //TODO:Make method when endpoint will be
    return this.httpClient.post(this.baseUrl + 'security-service/account/login-with-facebook', authToken);
  }

  loginWithUserInfo(user: UserLogin){
    return this.httpClient.post<string>(this.baseUrl + '/security-service/login', user).pipe(
      map((token) => {
        if(token){
          this.setCurrentUser(token);
        }
      })
    );
  }

  registerWithUserInfo(user: UserRegister){
    //TODO:Pipe response
    return this.httpClient.post(this.baseUrl + 'security-service/account/register', user);
  }

  setCurrentUser(token: string){
    const tokenObj = this.getDecodedToken(token);
    const user: User = {
      id: tokenObj.jti,
      email: tokenObj.sub,
      roles: tokenObj.roles,
      token: token,
      mainPhoto: tokenObj.mainPhoto,
      name: tokenObj.name
    };

    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getDecodedToken(token: string): Token{
    return JSON.parse(atob(token.split('.')[1]));
  }

}
