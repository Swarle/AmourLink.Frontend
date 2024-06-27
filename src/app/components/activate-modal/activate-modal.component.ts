import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-activate-modal',
  templateUrl: './activate-modal.component.html',
  styleUrls: ['./activate-modal.component.scss']
})
export class ActivateModalComponent {

  constructor(public dialogRef: MatDialogRef<ActivateModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
