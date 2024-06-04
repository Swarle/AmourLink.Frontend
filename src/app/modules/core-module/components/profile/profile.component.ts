import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from "../../../../services/account.service";
import {User} from "../../../../models/userModels/user";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ProfileEditComponent} from "../profile-edit/profile-edit.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit{
  user?: User;
  bsProfileEditModalRef?: BsModalRef<ProfileEditComponent>

  constructor(private accountService: AccountService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(
      user => this.user = user
    );
  }

    openProfileEditModal(){
    this.bsProfileEditModalRef = this.modalService.show(ProfileEditComponent,
      Object.assign({}, {class: 'modal_profile-edit'}));
  }
}
