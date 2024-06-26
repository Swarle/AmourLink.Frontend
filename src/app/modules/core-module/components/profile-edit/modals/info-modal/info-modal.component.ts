import {Component, Input, OnInit} from '@angular/core';
import {Info} from "../../../../../../models/user-models/info";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Answer} from "../../../../../../models/user-models/answer";
import {Subject} from "rxjs";
import {ProfileEditService} from "../../../../services/profile-edit.service";
import {HttpErrorContent} from "../../../../../../models/api-infrastructure/http-error-content";

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit{
  @Input() answerId?: string;
  @Input() infoId?: string;
  buttonClick = new Subject<string | undefined>();
  infoWithAnswers?: Info;
  isListChanged: boolean = false;

  constructor(public bsModalRef: BsModalRef,
              private profileEditService: ProfileEditService) {  }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(){
    if(this.infoId){
      this.profileEditService.getInfoById(this.infoId).subscribe({
        next: info => {
          this.infoWithAnswers = info;
        },
        error: (err: HttpErrorContent<Info[]>) => {
          this.infoWithAnswers = err.body.result?.find(i => i.id === this.infoId);
        }
      })
    }
  }

  onItemClick(answerId: string | undefined){
    if (answerId){
      const newAnswer = this.infoWithAnswers?.answers
        .find((answer: Answer) => answer.id === answerId);

      if(newAnswer)
        this.answerId = newAnswer.id;
    }
    else
      this.answerId = answerId;

    this.isListChanged = true;
  }

  onButtonClick(){
    this.buttonClick.next(this.answerId);

    this.bsModalRef.hide();
  }
}
