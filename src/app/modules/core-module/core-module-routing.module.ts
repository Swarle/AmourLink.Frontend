import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecommendationComponent} from "./components/recomendation/recommendation.component";
import {NavComponent} from "./components/nav/nav.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileEditComponent} from "./components/profile-edit/profile-edit.component";
import {LikeListComponent} from "./components/like-list/like-list.component";
import {roleGuard} from "../../guards/role.guard";

const routes: Routes = [
  { path: '',
    component: NavComponent,
    canActivate: [roleGuard],
    children: [
      { path: 'recommendation', component: RecommendationComponent, },
      { path: '',redirectTo: '/core/recommendation', pathMatch: 'full' },
      {path: 'profile', component: ProfileComponent},
      {path: 'profile/edit', component: ProfileEditComponent},
      {path: 'like-list', component: LikeListComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreModuleRoutingModule { }
