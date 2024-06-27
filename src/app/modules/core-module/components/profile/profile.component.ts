import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AccountService} from "../../../../services/account.service";
import {User} from "../../../../models/user-models/user";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ProfileEditComponent} from "../profile-edit/profile-edit.component";
import {Router} from "@angular/router";
import {ProfileEditService} from "../../services/profile-edit.service";
import {Profile} from "../../../../models/profile";
import {take} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit{
  profile?: Profile;
  bsProfileEditModalRef?: BsModalRef<ProfileEditComponent>

  constructor(private accountService: AccountService,
              private modalService: BsModalService,
              private router: Router,
              private profileEditService: ProfileEditService) {
  }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          if(user.roles.find(r => r.roleName === 'INCOMPLETE_USER')){
            this.openProfileEditModal();
          }
          else{
            this.profileEditService.getProfile()?.subscribe({
              next: profile => {
                this.profile = profile;
              }
            })
          }
        }
      }
    });
  }

  logout(){
    this.accountService.clearCurrentUser();
    this.router.navigateByUrl('');
  }

  openProfileEditModal(){
  this.bsProfileEditModalRef = this.modalService.show(ProfileEditComponent,
    Object.assign({}, {class: 'modal_profile-edit'}));
  }
}
