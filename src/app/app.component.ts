import {Component, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
}
