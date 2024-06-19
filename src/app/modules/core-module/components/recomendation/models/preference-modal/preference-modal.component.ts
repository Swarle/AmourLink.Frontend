import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PreferenceService} from "../../../../services/preference.service";
import {Preference} from "../../../../../../models/preference";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ToastrService} from "ngx-toastr";
import {HttpErrorContent} from "../../../../../../models/api-infrastructure/http-error-content";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PreferenceValidationMessages} from "../../../../validation-messages/preference-validation-messages";
import {SessionService} from "../../../../services/session.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-preference-modal',
  templateUrl: './preference-modal.component.html',
  styleUrls: ['./preference-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreferenceModalComponent implements OnInit{
  preference?: Preference;
  onSubmitEvent = new Subject<Preference>();
  formGroup:  FormGroup = new FormGroup({});
  protected readonly PreferenceValidationMessages =
    PreferenceValidationMessages;
  constructor(private preferenceService: PreferenceService,
              public bsModalRef: BsModalRef,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder,
              private sessionService: SessionService)
  {}

  ngOnInit(): void {
    this.loadPreference();
  }

  loadPreference(){
    this.preferenceService.getUserPreference().subscribe({
      next: preference => {
        this.preference = preference;
        this.initForm();
      },
      error: (err: HttpErrorContent<any>) => {
        switch (err.status){
          case 404:
            this.bsModalRef.hide();
            this.toastrService.error("Вибачте, але ви не маєте уподобань");
            break;
        }
      }
    });
  }

  initForm(){
   if(this.preference){
     this.formGroup = this.formBuilder.group({
       gender: [this.preference.gender, [Validators.required]],
       minAge: [this.preference.minAge,
         [Validators.required, Validators.max(100), Validators.min(18)]],
       maxAge: [this.preference.maxAge,
         [Validators.required, Validators.max(100), Validators.min(18)]],
       distanceRange: [this.preference.distanceRange,
         [Validators.required, Validators.min(1), Validators.max(250)]]
     });
   }
  }

  onSubmit(){
    if(this.preference){
      this.preferenceService.updatePreference(this.formGroup.value).subscribe({
        next: _ => {
          this.sessionService.clearInteraction();
          this.onSubmitEvent.next(this.formGroup.value);
          this.bsModalRef.hide();
        }
      })
    }
  }

}
