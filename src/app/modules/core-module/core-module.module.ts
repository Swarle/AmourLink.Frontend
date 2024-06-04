import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModuleRoutingModule } from './core-module-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { RecommendationComponent } from './components/recomendation/recommendation.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import {ErrorInterceptor} from "../../interceptors/error.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "../../interceptors/jwt.interceptor";
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {AppModule} from "../../app.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TextInputComponent} from "../shared/components/text-input/text-input.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    NavComponent,
    RecommendationComponent,
    ProfileComponent,
    ProfileEditComponent,
  ],
  imports: [
    CommonModule,
    CoreModuleRoutingModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ]
})
export class CoreModuleModule { }
