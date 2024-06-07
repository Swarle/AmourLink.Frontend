import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextInputComponent} from "./components/text-input/text-input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";



@NgModule({
  declarations: [
    TextInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
    }),
  ],
  exports: [
    TextInputComponent,
    ToastrModule,
  ]
})
export class SharedModule { }
