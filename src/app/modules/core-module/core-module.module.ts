import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModuleRoutingModule } from './core-module-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { RecomendationComponent } from './components/recomendation/recomendation.component';


@NgModule({
  declarations: [
    NavComponent,
    RecomendationComponent,
  ],
  imports: [
    CommonModule,
    CoreModuleRoutingModule
  ]
})
export class CoreModuleModule { }
