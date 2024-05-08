import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecomendationComponent} from "./components/recomendation/recomendation.component";
import {NavComponent} from "./components/nav/nav.component";

const routes: Routes = [
  { path: '',
    component: NavComponent,
    children: [
      { path: 'recomendation', component: RecomendationComponent, },
      { path: '',redirectTo: '/core/recomendation', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreModuleRoutingModule { }
