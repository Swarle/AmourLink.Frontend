import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecommendationComponent} from "./components/recomendation/recommendation.component";
import {NavComponent} from "./components/nav/nav.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  { path: '',
    component: NavComponent,
    children: [
      { path: 'recommendation', component: RecommendationComponent, },
      { path: '',redirectTo: '/core/recommendation', pathMatch: 'full' },
      {path: 'profile', component: ProfileComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreModuleRoutingModule { }
