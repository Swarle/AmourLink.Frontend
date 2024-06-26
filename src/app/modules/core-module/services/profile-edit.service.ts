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

  updateProfile(profile: Profile){
    return this.httpClient.put<Profile>(this.baseUrl + '/user-service/profile/update', profile);
  }

  removePicture(pictureId: string){
    let params = new HttpParams();

    params = params.append('id', pictureId);

    return this.httpClient.delete(this.baseUrl + '/user-service/profile/picture', {params})
  }

  changePicturePosition(picturePositionChange: PicturePosition){
    return this.httpClient.put(this.baseUrl + '/user-service/profile/swap-pictures', picturePositionChange);
  }

  addPicture(picture: File){
    return this.httpClient.post<Picture>(this.baseUrl + '/user-service/profile/picture', picture);
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
}
