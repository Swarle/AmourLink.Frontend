import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecommendationComponent} from "./components/recomendation/recommendation.component";
import {NavComponent} from "./components/nav/nav.component";

const routes: Routes = [
  { path: '',
    component: NavComponent,
    children: [
      { path: 'recomendation', component: RecommendationComponent, },
      { path: '',redirectTo: '/core/recomendation', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreModuleRoutingModule { }
