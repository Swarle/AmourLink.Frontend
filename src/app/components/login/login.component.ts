import {Component, OnInit} from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {AccountService} from "../../services/account.service";
import {AppComponent} from "../../app.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  parentComponent?: AppComponent;
  loginForm: FormGroup = new FormGroup({});
  loginValidationErrors: Map<string, string> = new Map([
    ["required", "Логін обов'язковий"]
  ]);
  passwordValidationErrors: Map<string, string>  = new Map([
    ["required", "Пароль обов'язковий"],
    ["minlength", "Пароль має містити мінімум 4 символи"]
  ])


  constructor(private authService: SocialAuthService, private accountService: AccountService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.authService.authState.subscribe((user) => {
      if(user != null){
        if(user.provider == "GOOGLE")
          this.accountService.verifyGoogleIdToken(user.idToken);
        else if(user.provider == "FACEBOOK")
          this.accountService.loginWithFacebook(user);

        //TODO: There are will be redirect to main page
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

  private initializeForm(){
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(){
    this.accountService.loginWithUserInfo(this.loginForm.value).subscribe({
      next: () => {
        //TODO: There are will be redirect to the main page
      }
    })
  }

}
