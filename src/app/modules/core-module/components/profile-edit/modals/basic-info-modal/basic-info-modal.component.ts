import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";
import {BasicInfo} from "../../../../../../models/basic-info";
import {BasicInfoValidationMessages} from "../../../../validation-messages/basic-info-validation-messages";
import {Profile} from "../../../../../../models/profile";

@Component({
  selector: 'app-basic-info-modal',
  templateUrl: './basic-info-modal.component.html',
  styleUrls: ['./basic-info-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicInfoModalComponent implements OnInit{
  @Input() basicInfo: BasicInfo = {} as BasicInfo;
  onSubmit = new Subject<BasicInfo>();
  formGroup:  FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              public basicInfoModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.initializeBasicInfoForm();
  }

  initializeBasicInfoForm(){
      this.formGroup = this.formBuilder.group({
        firstname: [this.basicInfo.firstname, [Validators.required,Validators.minLength(2) ,Validators.maxLength(45)]],
        lastname: [this.basicInfo.lastname, [Validators.maxLength(45), Validators.minLength(2)]],
        nationality: [this.basicInfo.nationality, [Validators.minLength(5), Validators.maxLength(45)]],
        age: [this.basicInfo.age, [Validators.required, Validators.max(100), Validators.min(18)]],
        gender: [this.basicInfo.gender, Validators.required]
      });
  }

  submitBasicInfoModal(){
    if(this.formGroup.valid){
      this.onSubmit.next(this.formGroup.value);

      this.basicInfoModalRef.hide();
    }
  }

  protected readonly BasicInfoValidationMessages = BasicInfoValidationMessages;
}
