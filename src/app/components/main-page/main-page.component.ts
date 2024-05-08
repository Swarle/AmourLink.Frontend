import {Component, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent {
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
