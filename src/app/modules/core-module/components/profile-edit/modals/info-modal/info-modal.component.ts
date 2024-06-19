import {Component, Input} from '@angular/core';
import {Info} from "../../../../../../models/user-models/info";
import {BsModalRef} from "ngx-bootstrap/modal";
import {InfoWithAnswers} from "../../../../../../models/user-models/infoWithAnswers";
import {Answer} from "../../../../../../models/user-models/answer";
import {Subject} from "rxjs";

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {
  @Input() info?: Info;
  buttonClick = new Subject<Info>();
  infoWithAnswers?: InfoWithAnswers;
  isListChanged: boolean = false;

  constructor(public bsModalRef: BsModalRef) {
    this.infoWithAnswers = {
      id: '1',
      title: 'Знак зодіаку',
      answers: [{
        id: '1',
        answer: 'Стрілець',
      },
      {
        id: '2',
        answer: 'Козеріг',
      },
      {
        id: '3',
        answer: 'Ваги'
      }]
    } as InfoWithAnswers
  }

  onItemClick(answerId: string){
    const newAnswer = this.infoWithAnswers?.answers
      .find((answer: Answer) => answer.id === answerId);

    if(newAnswer && this.info){
      this.info.answer = newAnswer;
    }

    this.isListChanged = true;
  }

  onButtonClick(){
    if(this.info)
      this.buttonClick.next(this.info);
  }
}
