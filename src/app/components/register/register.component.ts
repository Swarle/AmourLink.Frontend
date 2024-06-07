import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../app.component";
import {FacebookLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {AccountService} from "../../services/account.service";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {passwordRegex} from "../../helpers/passwordRegex";
import {MainPageComponent} from "../main-page/main-page.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  parentComponent?: MainPageComponent;
  registerForm: FormGroup = new FormGroup({});
  loginValidationErrors: Map<string, string> = new Map([
    ["required", "Імейл обов'язковий"],
    ['email', "Некоректний імейл"]
  ]);
  passwordValidationErrors: Map<string, string>  = new Map([
    ["required", "Пароль обов'язковий"],
    ["minlength", "Пароль має містити мінімум 4 символи"],
    ["pattern", "Пароль не вірного формату"]
  ]);
  confirmPasswordValidationErrors: Map<string, string>
    = new Map([
      ["required", "Пароль підтведження обов'язковий"],
      ["notMatching", "Паролі не співпадають"],
      ["pattern", "Пароль не вірного формату"]
    ]);



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
      }
    });
  }

  initializeForm(){
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.pattern(passwordRegex)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password'), Validators.pattern(passwordRegex)]]
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  onSubmit(){
    this.accountService.registerWithUserInfo(this.registerForm.value).subscribe({
      next:  () => {
        //TODO: There will be redirect to main page
      }
    })
  }

  loginWithFacebook(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  openLoginModal(){
    this.parentComponent?.bsRegisterModalRef?.hide();
    this.parentComponent?.openLoginModal();
  }

}
