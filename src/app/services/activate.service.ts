import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivateModalComponent} from "../components/activate-modal/activate-modal.component";
import {AccountService} from "./account.service";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivateService {
  dialogRef?: MatDialogRef<ActivateModalComponent>;

  constructor(private dialog: MatDialog, private accountService: AccountService) { }

  openActivateModal(){
    this.dialogRef = this.dialog.open(ActivateModalComponent);
    this.dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: _ => {
        this.accountService.currentUser$.pipe(take(1)).subscribe({
          next: user => {
            if((user && !user.enabled) || !user){
              this.openActivateModal();
            }
          }
        });
      }
    });
  }
}
