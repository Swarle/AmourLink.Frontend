import {Component, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  bsLoginModalRef?: BsModalRef<LoginComponent>;
  bsRegisterModalRef?: BsModalRef<RegisterComponent>;

  constructor(private modalService: BsModalService) {
  }

  openLoginModal(){
    this.bsLoginModalRef = this.modalService.show(LoginComponent,
        Object.assign({}, {class: 'modal_auth'}));
    this.bsLoginModalRef.content!.parentComponent = this;
  }

  openRegisterModal(){
    this.bsRegisterModalRef = this.modalService.show(RegisterComponent,
        Object.assign({}, {class: 'modal_auth'}));
    this.bsRegisterModalRef.content!.parentComponent = this;
  }
}
