import {Component, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {LoginComponent} from "./components/login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  bsModalRef?: BsModalRef<LoginComponent>;


  constructor(private modalService: BsModalService) {
  }

  openLoginModal(){
    this.bsModalRef = this.modalService.show(LoginComponent, Object.assign({}, {class: 'modal-login'}));
  }
}
