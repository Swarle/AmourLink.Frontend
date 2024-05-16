import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModuleRoutingModule } from './core-module-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { RecommendationComponent } from './components/recomendation/recommendation.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import {ErrorInterceptor} from "../../interceptors/error.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";


@NgModule({
  declarations: [
    NavComponent,
    RecommendationComponent,
  ],
  imports: [
    CommonModule,
    CoreModuleRoutingModule,
    CarouselModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ]
})
export class CoreModuleModule { }
