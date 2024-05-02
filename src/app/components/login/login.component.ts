import {Component, OnInit} from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {AccountService} from "../../services/account.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  parentComponent?: AppComponent;


  constructor(private authService: SocialAuthService, private accountService: AccountService) {
  }

  ngOnInit(): void {
      this.authService.authState.subscribe((user) => {
        if(user != null){
          if(user.provider == "GOOGLE")
            this.accountService.verifyGoogleIdToken(user.idToken);
          else if(user.provider == "FACEBOOK")
            this.accountService.loginWithFacebook(user);
        }
      });
    }

  loginWithFacebook(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  openRegisterModal(){
    this.parentComponent?.bsLoginModalRef?.hide();
    this.parentComponent?.openRegisterModal();
  }

}
