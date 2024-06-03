import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../../services/account.service";
import {User} from "../../../../models/userModels/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user?: User;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
        this.accountService.currentUser$.subscribe(
          user => this.user = user
        );
    }
}
