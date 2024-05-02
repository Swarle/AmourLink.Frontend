import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../app.component";
import {FacebookLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {AccountService} from "../../services/account.service";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  parentComponent?: AppComponent;
  registerForm: FormGroup = new FormGroup({});
  loginValidationErrors: Map<string, string> = new Map([
    ["required", "Логін обов'язковий"]
  ]);
  passwordValidationErrors: Map<string, string>  = new Map([
    ["required", "Пароль обов'язковий"],
    ["minlength", "Пароль має містити мінімум 4 символи"]
  ]);
  confirmPasswordValidationErrors: Map<string, string>
    = new Map([
      ["required", "Пароль підтведження обов'язковий"],
      ["notMatching", "Паролі не співпадають"]
    ]);


  constructor(private authService: SocialAuthService, private accountService: AccountService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.authService.authState.subscribe((user) => {
      if(user != null){
        console.log(user);
        if(user.provider == "GOOGLE")
          this.accountService.verifyGoogleIdToken(user.idToken);
        else if(user.provider == "FACEBOOK")
          this.accountService.loginWithFacebook(user.authToken);
      }
    });
  }

  initializeForm(){
    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });

    console.log(this.registerForm);
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
