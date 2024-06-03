import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../models/userModels/userLogin";
import {UserRegister} from "../models/userModels/userRegister";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/userModels/user";
import {Token} from "../models/apiInfrastructure/token";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource: BehaviorSubject<User | undefined>;
  currentUser$: Observable<User | undefined>;
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3YTJiZmExNS05MTcxLT' +
    'RkYjktODA4ZC1jMGQwNmUyNTc1NTkiLCJzdWIiOiJ2dmFzaWx0c292YUBjb21zZW56LmNvbSIsInJvbGVzIjpbIl' +
    'VzZXIiXSwibWFpblBob3RvIjoiaHR0cHM6Ly9yYW5kb211c2VyLm1lL2FwaS9wb3J0cmFpdHMvbWVuLzI1LmpwZyI' +
    'sIm5hbWUiOiJDYW5kaWUgR3JlZ291bCIsImlhdCI6MTUxNjIzOTAyMn0.CNuegsSaJ82pdJaMPheVP42vwTSWogNQVbdS7RySef8';

  constructor(private httpClient: HttpClient) {
    this.currentUserSource = new BehaviorSubject<User | undefined>(JSON.parse(localStorage.getItem('user')!));
    this.currentUser$ = this.currentUserSource.asObservable();
  }

  verifyGoogleIdToken(tokenId: string){
    //TODO:Change url when endpoint will be ready
    return this.httpClient.post(this.baseUrl + 'security-service/account/verifyTokenId', tokenId);
  }

  loginWithFacebook(authToken: string){
    //TODO:Make method when endpoint will be
    return this.httpClient.post(this.baseUrl + 'security-service/account/login-with-facebook', authToken);
  }

  loginWithUserInfo(user: UserLogin){
    //TODO:Pipe response
    this.setCurrentUser(this.token);
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
