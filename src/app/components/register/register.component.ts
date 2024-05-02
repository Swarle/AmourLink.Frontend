import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../app.component";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
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

  openLoginModal(){
    this.parentComponent?.bsRegisterModalRef?.hide();
    this.parentComponent?.openLoginModal();
  }

}
