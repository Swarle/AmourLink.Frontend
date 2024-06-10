import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Picture} from "../../../../models/userModels/picture";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {BasicInfoModalComponent} from "./modals/basic-info-modal/basic-info-modal.component";
import {SearchSchoolModalComponent} from "./modals/search-school-modal/search-school-modal.component";
import {Degree} from "../../../../models/userModels/degree";
import {Info} from "../../../../models/userModels/info";
import {InfoModalComponent} from "./modals/info-modal/info-modal.component";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileEditComponent{
  profile?: any;
  infos?: any;
  basicInfoModalRef?: BsModalRef<BasicInfoModalComponent>;
  searchSchoolModalRef?: BsModalRef<SearchSchoolModalComponent>
  infoModalRef?: BsModalRef<InfoModalComponent>
  pictureFile?: File;

  constructor(private modalService: BsModalService,private formBuilder: FormBuilder,
              public bsModalRef: BsModalRef) {
    this.profile = {
      firstName: "Oleg",
      lastName: 'Petrov',
      age: 24,
      gender: 'Чоловік',
      bio: 'Lorem',
      occupation: 'Старший інженер',
      pictures: [{
        id: 'adfdfdas',
        pictureUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        position: 0
      },
      {
        id: 'adfvbxczfas',
        pictureUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
        position: 1
      }
      ] as Picture[],
      degree: {
        schoolName: 'Харківський Національний Університет радіоелектроніки',
        degreeType: 'Бакалавр',
        startYear: new Date()
      } as Degree,
      infos: [{
        titleId: '1',
        title: 'Знак зодіаку',
        answer: {
          answerId: '1',
          answer: 'Стрілець'
        }
      },
      {
        titleId: '2',
        title: 'Тип Особистості',
        answer: {
          answerId: '2',
          answer: 'ПРТА'
        }
      },
      {
        titleId: '3',
        title: 'Стиль спілування',
        answer: {
          answerId: '3',
          answer: 'Ліпше зустрітися'
        }
      }] as Info[]

    };

    this.infos = [{
      titleId: '1',
      title: 'Знак зодіаку',
    },
    {
      titleId: '2',
      title: 'Тип Особистості',
    },
    {
      titleId: '3',
      title: 'Стиль спілування',
    },
    {
      titleId: '4',
      title: 'Мова кохання'
    }];
  }

  getInfoAnswerByTitleId(titleId: string): string | undefined{
    const info = this.profile.infos.find((info: Info) => info.titleId === titleId);

    if(info)
      return info.answer.answer
    else
      return undefined
  }

  openInfoModal(id: string){
    const info = this.profile.infos.find((info: Info) => info.titleId === id);

    if(info){
      const initialState: ModalOptions = {
        initialState: {
          info: JSON.parse(JSON.stringify(info))
        }
      }
      this.infoModalRef = this.modalService.show(InfoModalComponent, initialState);
      this.infoModalRef?.content?.buttonClick.subscribe(result => this.submitInfoModal(result))
    }
  }

  submitInfoModal(info: Info){

  }

  onOccupationSubmit(){

  }

  openSearchSchoolModal(){
    this.searchSchoolModalRef = this.modalService.show(SearchSchoolModalComponent);
    this.searchSchoolModalRef.content?.onSchoolSelect.subscribe(result => {
      this.submitSchoolName(result);
    })
  }

  submitSchoolName(schoolName: string){
    this.profile.degree.schoolName = schoolName;

  }

  openBasicInfoModal(){
    const initialState: ModalOptions = {
      initialState: {
        profile: this.profile
      }
    };

    this.basicInfoModalRef = this.modalService.show(BasicInfoModalComponent, initialState);
    this.basicInfoModalRef?.content?.onSubmit.subscribe(result => {
      this.submitBasicInfoModal(result);
    })
  }

  submitBasicInfoModal(value: any){
    console.log(value);
    this.profile = this.basicInfoModalRef?.content?.profile;
  }

  get getRemainingPhotosCount(): number[]{
    if(this.profile.pictures.length < 6)
      return Array(6 - this.profile.pictures.length).fill(0);
    return Array(0);
  }

  onFileSelected(event: any) {
    //TODO: Send request when will be ready
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const newPicture: Picture = {
          id: 'test',
          pictureUrl: e.target.result,
          position: this.profile.pictures.length
        };
        this.profile.pictures.push(newPicture);
      };
      reader.readAsDataURL(file);
    }
  }

  changePicturePosition(event: CdkDragDrop<any>) {
    //TODO: Send request that chandes position
    event.container.data.item.position = event.previousContainer.data.index;
    event.previousContainer.data.item.position = event.container.data.index;
    this.profile.pictures[event.previousContainer.data.index] = event.container.data.item;
    this.profile.pictures[event.container.data.index] = event.previousContainer.data.item;
  }

  removePicture(id: string){
    //TODO: Send request
    this.profile.pictures = this.profile.pictures.filter((picture: Picture) => picture.id !== id);

    this.profile.pictures.forEach((picture: Picture, index: number) => {
      picture.position = index;
    });

    console.log(this.profile.pictures)
  }

  onBioSubmit(){
    //TODO: Send request
  }
}
