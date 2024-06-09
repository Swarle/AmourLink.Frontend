import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Picture} from "../../../../models/userModels/picture";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {BasicInfoModalComponent} from "./modals/basic-info-modal/basic-info-modal.component";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileEditComponent{
  profile?: any;
  basicInfoModalRef?: BsModalRef<BasicInfoModalComponent>;
  pictureFile?: File;

  constructor(private modalService: BsModalService,private formBuilder: FormBuilder,
              public bsModalRef: BsModalRef) {
    this.profile = {
      firstName: "Oleg",
      lastName: 'Petrov',
      age: 24,
      gender: 'Чоловік',
      bio: 'Lorem',
      pictures: [{
        id: 'adfdfdas',
        pictureUrl: 'https://randomuser.me/api/portraits/men/15.jpg',
        position: 0
      },
      {
        id: 'adfvbxczfas',
        pictureUrl: 'https://randomuser.me/api/portraits/men/13.jpg',
        position: 1
      },
      {
        id: 'adfasdf',
        pictureUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        position: 2
      },
      {
        id: 'adfff',
        pictureUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
        position: 3
      }
      ] as Picture[],

    }
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
