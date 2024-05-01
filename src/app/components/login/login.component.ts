import {Component, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private authService: SocialAuthService, private accountService: AccountService) {
  }

  ngOnInit(): void {
      this.authService.authState.subscribe((user) => {
        if(user != null){
          this.accountService.verifyIdToken(user.idToken);
        }
      });
    }


}
