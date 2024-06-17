import { Component } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {UniversityService} from "../../../../services/university.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-search-school-modal',
  templateUrl: './search-school-modal.component.html',
  styleUrls: ['./search-school-modal.component.scss']
})
export class SearchSchoolModalComponent {
  onSchoolSelect = new Subject<string>()
  schoolList?: string[];

  constructor(public bsModalRef: BsModalRef, private universityService: UniversityService) {
  }

  onInput(event: Event){
    const target = event.target as HTMLInputElement;

    this.universityService.getSchoolNames(target.value).subscribe({
      next: schoolList => {
        this.schoolList = schoolList;
      }
    });
  }

  onItemClick(event: Event){
    const target = event.target as HTMLElement;
    this.bsModalRef.hide();
    this.onSchoolSelect.next(target.innerText);
  }
}
