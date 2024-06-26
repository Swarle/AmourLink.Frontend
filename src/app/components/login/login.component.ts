import {Component, OnInit} from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {AccountService} from "../../services/account.service";
import {AppComponent} from "../../app.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordRegex} from "../../helpers/passwordRegex";
import {MainPageComponent} from "../main-page/main-page.component";
import {User} from "../../models/user-models/user";
import {UserLogin} from "../../models/user-models/user-login";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  parentComponent?: MainPageComponent;
  loginForm: FormGroup = new FormGroup({});
  emailValidationErrors: Map<string, string> = new Map([
    ["required", "Імейл обов'язковий"],
    ['email', "Некоректний імейл"]
  ]);
  passwordValidationErrors: Map<string, string>  = new Map([
    ["required", "Пароль обов'язковий"],
    ["minlength", "Пароль має містити мінімум 4 символи"],
    ['pattern', 'Пароль не вірного формату']
  ])


  constructor(private authService: SocialAuthService, private accountService: AccountService,
              private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.authService.authState.subscribe((user) => {
      if(user != null){
        if(user.provider == "GOOGLE")
          this.accountService.loginWithGoogle(user.idToken).subscribe({
            next: () => {
              this.router.navigateByUrl('/core');
              this.parentComponent?.bsLoginModalRef?.hide();
            }
          });
        else if(user.provider == "FACEBOOK")
          this.accountService.loginWithFacebook(user.authToken);

        //TODO: There are will be redirect to main page
      }
    });
    }

  loginWithFacebook(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.parentComponent?.bsLoginModalRef?.hide();
  }

  openRegisterModal(){
    this.parentComponent?.bsLoginModalRef?.hide();
    this.parentComponent?.openRegisterModal();
  }

  private initializeForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.pattern(passwordRegex)]]
    });
  }

  onSubmit(){
    //TODO: Change when will be security service
    this.accountService.loginWithUserInfo(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/core');
        this.parentComponent?.bsLoginModalRef?.hide();
      }
    });

  }

}
