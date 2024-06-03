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


@NgModule({
  declarations: [
    NavComponent,
    RecommendationComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    CoreModuleRoutingModule,
    CarouselModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ]
})
export class CoreModuleModule { }
