import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";
import {BasicInfo} from "../../../../../../models/basicInfo";

@Component({
  selector: 'app-basic-info-modal',
  templateUrl: './basic-info-modal.component.html',
  styleUrls: ['./basic-info-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicInfoModalComponent implements OnInit{
  @Input() profile: any;
  onSubmit = new Subject<BasicInfo>();
  formGroup:  FormGroup = new FormGroup({});
  firstNameValidationMap: Map<string, string> = new Map([
    ["required", "Ім'я обов'язкове"],
    ["maxlength", "Поле має бути не більше 45 символів"],
    ["minlength", "Поле має містити мінімум 2 символи"]
  ]);
  lastNameValidationMap: Map<string, string> = new Map([
    ["maxlength", "Поле має бути не більше 45 символів"],
    ["minlength", "Поле має містити мінімум 2 символи"]
  ]);
  nationalityValidationMap: Map<string, string> = new Map([
    ["maxlength", "Поле має бути не більше 45 символів"],
    ["minlength", "Поле має містити мінімум 5 символи"]
  ]);
  ageValidationMap: Map<string, string> = new Map([
    ["required", "Вік обов'язковий"],
    ["max", "Вік має бути не більше 100-років"],
    ["min", "Вік має бути більше 18"]
  ]);

  constructor(private formBuilder: FormBuilder,
              public basicInfoModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.initializeBasicInfoForm();
  }

  initializeBasicInfoForm(){
    this.formGroup = this.formBuilder.group({
      firstName: [this.profile.firstName, [Validators.required,Validators.minLength(2) ,Validators.maxLength(45)]],
      lastName: [this.profile.lastName, [Validators.maxLength(45), Validators.minLength(2)]],
      nationality: [this.profile.nationality, [Validators.minLength(5), Validators.maxLength(45)]],
      age: [this.profile.age, [Validators.required, Validators.max(100), Validators.min(18)]],
      gender: [this.profile.gender, Validators.required]
    })
  }

  submitBasicInfoModal(){
    if(this.formGroup.valid){
      const formValues = this.formGroup.value;
      Object.assign(this.profile, formValues);

      this.onSubmit.next(this.formGroup.value);

      this.basicInfoModalRef.hide();
    }
  }
}
