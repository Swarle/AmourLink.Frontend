import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModuleRoutingModule } from './core-module-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { RecommendationComponent } from './components/recomendation/recommendation.component';
import {CarouselModule} from "ngx-bootstrap/carousel";


@NgModule({
  declarations: [
    NavComponent,
    RecommendationComponent,
  ],
  imports: [
    CommonModule,
    CoreModuleRoutingModule,
    CarouselModule.forRoot()
  ]
})
export class CoreModuleModule { }
