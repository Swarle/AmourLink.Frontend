import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Picture} from "../../../../models/user-models/picture";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {BasicInfoModalComponent} from "./modals/basic-info-modal/basic-info-modal.component";
import {SearchSchoolModalComponent} from "./modals/search-school-modal/search-school-modal.component";
import {Degree} from "../../../../models/user-models/degree";
import {Info} from "../../../../models/user-models/info";
import {InfoModalComponent} from "./modals/info-modal/info-modal.component";
import {BasicInfo} from "../../../../models/basicInfo";
import {ProfileEditService} from "../../services/profile-edit.service";
import {PicturePositionChange} from "../../../../models/picturePositionChange";

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

  constructor(private modalService: BsModalService, public bsModalRef: BsModalRef,
              private profileEditService: ProfileEditService) {
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
        id: '1',
        title: 'Знак зодіаку',
        answer: {
          id: '1',
          answer: 'Стрілець'
        }
      },
      {
        id: '2',
        title: 'Тип Особистості',
        answer: {
          id: '2',
          answer: 'ПРТА'
        }
      },
      {
        id: '3',
        title: 'Стиль спілування',
        answer: {
          id: '3',
          answer: 'Ліпше зустрітися'
        }
      }] as Info[]

    };

    this.infos = [{
      id: '1',
      title: 'Знак зодіаку',
    },
    {
      id: '2',
      title: 'Тип Особистості',
    },
    {
      id: '3',
      title: 'Стиль спілування',
    },
    {
      id: '4',
      title: 'Мова кохання'
    }];
  }

  getInfoAnswerByTitleId(titleId: string): string | undefined{
    const info = this.profile.infos.find((info: Info) => info.id === titleId);

    if(info)
      return info.answer.answer
    else
      return undefined
  }

  openInfoModal(id: string){
    const info = this.profile.infos.find((info: Info) => info.id === id);

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
    this.profileEditService.updateInfo(info).subscribe({
      next: _ => {
        const index = this.profile.infos.findIndex((info: Info) => info.id === info.id);

        if(index !== -1){
          this.profile.infos[index] = info;
        }
      }
    })
  }

  submitOccupation(){
    this.profileEditService.updateOccupation(this.profile.occupation).subscribe({});
  }

  openSearchSchoolModal(){
    this.searchSchoolModalRef = this.modalService.show(SearchSchoolModalComponent);
    this.searchSchoolModalRef.content?.onSchoolSelect.subscribe(result => {
      this.submitSchoolName(result);
    })
  }

  submitSchoolName(schoolName: string){
    this.profileEditService.updateSchoolName(schoolName).subscribe({
      next: _ => {
        this.profile.degree.schoolName = schoolName;
      }
    })
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

  submitBasicInfoModal(value: BasicInfo){
    //TODO: Handle response
    this.profileEditService.updateBasicInfo(value).subscribe({
      next: response => {
        this.profile = this.basicInfoModalRef?.content?.profile;
      }
    });
  }

  get getRemainingPhotosCount(): number[]{
    if(this.profile.pictures.length < 6)
      return Array(6 - this.profile.pictures.length).fill(0);
    return Array(0);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.profileEditService.addPicture(file).subscribe({
      next: picture =>
        this.profile.pictures.push(picture)
    });
  }

  changePicturePosition(event: CdkDragDrop<any>) {
    const picturePositionChange = {
      firstPictureId: this.profile.pictures[event.previousContainer.data.index].id,
      secondPictureId: this.profile.pictures[event.container.data.index].id,
    } as PicturePositionChange

    this.profileEditService.changePicturePosition(picturePositionChange).subscribe({
      next: _ => {
        event.container.data.item.position = event.previousContainer.data.index;
        event.previousContainer.data.item.position = event.container.data.index;
        this.profile.pictures[event.previousContainer.data.index] = event.container.data.item;
        this.profile.pictures[event.container.data.index] = event.previousContainer.data.item;
      }
    });
  }

  removePicture(id: string){
    this.profileEditService.removePicture(id).subscribe({
      next: _ => {
        this.profile.pictures = this.profile.pictures.filter((picture: Picture) => picture.id !== id);

        this.profile.pictures.forEach((picture: Picture, index: number) => {
          picture.position = index;
        });
      }
    });
  }

  submitBio(){
    //TODO: Handle request
    this.profileEditService.updateBio(this.profile.bio).subscribe({
      next: _ => {

      }
    });
  }
}
