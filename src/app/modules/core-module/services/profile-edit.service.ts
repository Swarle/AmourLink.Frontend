import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Profile} from "../../../models/profile";
import {AccountService} from "../../../services/account.service";
import {map, take} from "rxjs";
import {User} from "../../../models/user-models/user";
import {BasicInfo} from "../../../models/basic-info";
import {PicturePosition} from "../../../models/picture-position";
import {Picture} from "../../../models/user-models/picture";
import {Info} from "../../../models/user-models/info";
import {Degree} from "../../../models/user-models/degree";

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient, private accountService: AccountService) { }

  getProfile(){
    let currentUser: User | undefined;

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user)
          currentUser = user;
      }
    });

    if(!currentUser)
      return;

    return this.httpClient.get<Profile>(this.baseUrl + `/user-service/profile/${currentUser.id}`)
      .pipe(
        map(profile => {
          profile.pictures = profile.pictures.sort((a, b) => a.position - b.position);
          console.log(profile.pictures);

          return profile;
        })
      );
  }

  getProfileById(userId: string){
    return this.httpClient.get<Profile>(this.baseUrl + `/user-service/profile/${userId}`)
      .pipe(
        map(profile => {
          profile.pictures = profile.pictures.sort((a, b) => a.position - b.position);

          return profile;
        })
      );
  }

  removePicture(pictureId: string){
    return this.httpClient.delete(this.baseUrl + `/user-service/profile/delete-picture/${pictureId}`)
  }

  changePicturePosition(picturePositionChange: PicturePosition){
    return this.httpClient.put(this.baseUrl + '/user-service/profile/swap-pictures', picturePositionChange);
  }

  addPicture(picture: File, position: number){
    const formData: FormData = new FormData();
    formData.append('file', picture, picture.name);
    formData.append('position', position.toString());

    return this.httpClient.post<Profile>(this.baseUrl + '/user-service/profile/add-picture', formData);
  }

  getAllInfo(){
    return this.httpClient.get<Info[]>(this.baseUrl + '/user-service/info/get-all');
  }

  getInfoById(id: string){
    let params = new HttpParams();

    params = params.append('id', id);

    return this.httpClient.get<Info[]>(this.baseUrl + '/user-service/info/get-all', {params})
      .pipe(
        map(info => {
          return info.find(i => i.id === id);
        })
      );
  }

  updateBasicInfo(basicInfo: BasicInfo){
    return this.httpClient.put<Profile>(this.baseUrl + '/user-service/profile/update-basic', basicInfo);
  }

  updateBio(userId: string, bio: string){
    return this.httpClient.put<Profile>(this.baseUrl + '/user-service/profile/update-bio', {
      id: userId,
      value: bio
    });
  }

  updateDegree(degree: Degree){
    return this.httpClient.put<Profile>(this.baseUrl + '/user-service/profile/update-degree', degree);
  }

  updateOccupation(userId: string, occupation: string){
    return this.httpClient.put<Profile>(this.baseUrl + '/user-service/profile/update-occupation',{
      id: userId,
      value: occupation
    });
  }

  addInfoDetails(info: Info){
    return this.httpClient.put<Profile>(this.baseUrl + '/user-service/profile/add-info-details', {
      infoId: info.id,
      answerId: info.answers[0].id
    })
  }

  deleteInfoDetails(infoId: string){
    return this.httpClient.delete<Profile>(this.baseUrl + `/user-service/profile/delete-info-details/${infoId}`);
  }

  createProfile(basicInfo: BasicInfo){
    return this.httpClient.post<Profile>(this.baseUrl + '/user-service/profile/add', basicInfo);
  }
}
