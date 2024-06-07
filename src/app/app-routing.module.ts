import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', canActivate: [authGuard], component: MainPageComponent},
  {path: 'core', canActivate: [authGuard], loadChildren: () => import('./modules/core-module/core-module.module').then(m => m.CoreModuleModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
