import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {Picture} from "../../../../models/user-models/picture";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {BasicInfoModalComponent} from "./modals/basic-info-modal/basic-info-modal.component";
import {SearchSchoolModalComponent} from "./modals/search-school-modal/search-school-modal.component";
import {Info} from "../../../../models/user-models/info";
import {InfoModalComponent} from "./modals/info-modal/info-modal.component";
import {BasicInfo} from "../../../../models/basic-info";
import {ProfileEditService} from "../../services/profile-edit.service";
import {PicturePosition} from "../../../../models/picture-position";
import {Profile} from "../../../../models/profile";
import {HttpErrorContent} from "../../../../models/api-infrastructure/http-error-content";
import {deepCopy} from "../../services/deep-clone";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileEditComponent implements OnInit{
  profile?: Profile;
  info?: Info[];
  basicInfoModalRef?: BsModalRef<BasicInfoModalComponent>;
  searchSchoolModalRef?: BsModalRef<SearchSchoolModalComponent>
  infoModalRef?: BsModalRef<InfoModalComponent>

  constructor(private modalService: BsModalService, public bsModalRef: BsModalRef,
              private profileEditService: ProfileEditService) {    }

  ngOnInit(): void {
      this.loadProfile();
      this.loadInfo();
  }

  loadProfile(){
    this.profileEditService.getProfile()?.subscribe({
      next: profile => {
        this.profile = profile;
      }
    })
  }

  loadInfo(){
    this.profileEditService.getAllInfo().subscribe({
      next: info => {
        this.info = info;
        console.log(this.info);
      },
      error: (err: HttpErrorContent<Info[]>) =>{
        if(err.body && err.body.result){
          this.info = err.body.result;
        }
      }
    });
  }

  getInfoAnswerByTitleId(titleId: string): string | undefined{
    if(this.profile){
      const info = this.profile.info.find((info: Info) => info.id === titleId);

      if(info)
        return info.answers[0].answer
      else
        return undefined
    }
    else
      return undefined;
  }

  openInfoModal(id: string){
    if(this.profile) {
      let initialState: ModalOptions;
      const info = this.profile.info.find((info: Info) => info.id === id);

      if (info) {
        initialState = {
          initialState: {
            answerId: deepCopy(info.answers[0].id),
            infoId: id
          }
        }
      } else {
        initialState = {
          initialState: {
            infoId: id
          }
        };
      }

      this.infoModalRef = this.modalService.show(InfoModalComponent, initialState);
      this.infoModalRef?.content?.buttonClick.subscribe(result => this.submitInfoModal(id, result))
    }
  }

  submitInfoModal(infoId: string, answerId: string | undefined){
    if(this.profile && this.info){
        if(answerId) {
          const infoClone = deepCopy(this.info)
          let info = infoClone.find(i => i.id === infoId);
          if(!info)
            throw Error("Info with this id does not exist");

          info.answers = info.answers.filter(a => a.id === answerId);

          if(this.profile.info.find(i => i.id === infoId)){
            const index = this.profile.info.findIndex(i => i.id === infoId);
            console.log(index);
            this.profile.info[index] = info;
          }
          else{
            this.profile.info.push(info);
        }
      }
      else {
        const index = this.profile.info.findIndex(i => i.id === infoId);

        if(index !== -1){
          this.profile.info.splice(index, 1);
        }
      }
    }
  }

  updateProfile(){
    if(this.profile){
      this.profileEditService.updateProfile(this.profile).subscribe({
        next: profile => this.profile = profile
      })
    }
  }

  openSearchSchoolModal(){
    this.searchSchoolModalRef = this.modalService.show(SearchSchoolModalComponent);
    this.searchSchoolModalRef.content?.onSchoolSelect.subscribe(result => {
      this.submitSchoolName(result);
    })
  }

  submitSchoolName(schoolName: string){
    // this.profileEditService.updateSchoolName(schoolName).subscribe({
    //   next: _ => {
    //     this.profile.degree.schoolName = schoolName;
    //   }
    // })
  }

  openBasicInfoModal(){
    if(this.profile){
      const { firstname, lastname, nationality, age, gender } = this.profile;

      const initialState: ModalOptions = {
        initialState: {
          basicInfo: {firstname, lastname, nationality, age, gender}
        }
      };

      this.basicInfoModalRef = this.modalService.show(BasicInfoModalComponent, initialState);
      this.basicInfoModalRef?.content?.onSubmit.subscribe(result => {
        this.submitBasicInfoModal(result);
      });
    }
  }

  submitBasicInfoModal(value: BasicInfo){
    if(this.profile){
      Object.assign(this.profile, value);
      this.updateProfile();
    }
  }

  get getRemainingPhotosCount(): number[]{
    if(this.profile){
      if(this.profile.pictures.length < 6)
        return Array(6 - this.profile.pictures.length).fill(0);
      return Array(0);
    }
    else
      return [];
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.profileEditService.addPicture(file).subscribe({
      next: picture => {
        if(this.profile){
          this.profile.pictures.push(picture)
        }
      }
    });
  }

  changePicturePosition(event: CdkDragDrop<any>) {
    if(this.profile){
      const picturePositionChange = {
        firstPictureId: this.profile.pictures[event.previousContainer.data.index].id,
        secondPictureId: this.profile.pictures[event.container.data.index].id,
      } as PicturePosition

      this.profileEditService.changePicturePosition(picturePositionChange).subscribe({
        next: _ => {
          if(this.profile){
            event.container.data.item.position = event.previousContainer.data.index;
            event.previousContainer.data.item.position = event.container.data.index;
            this.profile.pictures[event.previousContainer.data.index] = event.container.data.item;
            this.profile.pictures[event.container.data.index] = event.previousContainer.data.item;
          }
        }
      });
    }
  }

  removePicture(id: string){
    this.profileEditService.removePicture(id).subscribe({
      next: _ => {
        if(this.profile){
          this.profile.pictures = this.profile.pictures.filter((picture: Picture) => picture.id !== id);

          this.profile.pictures.forEach((picture: Picture, index: number) => {
            picture.position = index;
          });
        }
      }
    });
  }
}

