import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileEditComponent implements OnInit{
  profile?: any;
  basicInfoModalRef?: BsModalRef;
  basicInfoFromGroup: FormGroup = new FormGroup({});
  basicInfoInputValidationMap: Map<string, string> = new Map([
    ["required", "Імейл обов'язковий"]
  ]);

  constructor(private modalService: BsModalService,private formBuilder: FormBuilder) {
    this.profile = {
      firstName: "Oleg",
      lastName: 'Petrov',
      age: 24,
      gender: 'Чоловік'
    }
  }

  ngOnInit(): void {
        this.initializeBasicInfoForm();
  }

  initializeBasicInfoForm(){
    this.basicInfoFromGroup = this.formBuilder.group({
      firstName: [this.profile.firstName, [Validators.required]],
      lastName: [this.profile.lastName, Validators.required],
      gender: [this.profile.gender, Validators.required]
    })
  }

  openBasicInfoModal(template: TemplateRef<void>){
    this.basicInfoModalRef = this.modalService.show(template);
  }

  submitBasicInfoModal(){
    this.basicInfoModalRef?.hide();
    //TODO: Send group info when route will be ready
  }
}
