import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ApiResponse} from "../../../models/apiInfrastructure/apiResponse";
import {Profile} from "../../../models/profile";
import {AccountService} from "../../../services/account.service";
import {map, take} from "rxjs";
import {User} from "../../../models/userModels/user";
import {BasicInfo} from "../../../models/basicInfo";
import {PicturePositionChange} from "../../../models/picturePositionChange";
import {Picture} from "../../../models/userModels/picture";
import {Info} from "../../../models/userModels/info";
import {H} from "@angular/cdk/keycodes";
import {InfoWithAnswers} from "../../../models/userModels/infoWithAnswers";

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient, private accountService: AccountService) { }

  getProfile(){
    let params = new HttpParams();

    let currentUser: User | undefined;

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user)
          currentUser = user;
      }
    });

    if(currentUser){
      params = params.append('id', currentUser.id)

      return this.httpClient.get<ApiResponse<Profile>>(this.baseUrl + '/user-service/profile', {params});
    }
    else
      throw new Error("You should be logged in for this action");
  }

  updateBasicInfo(value: BasicInfo){
    return this.httpClient.put(this.baseUrl + '/user-service/profile/basic-info', value);
  }

  updateBio(bio: string){
    return this.httpClient.put(this.baseUrl + '/user-service/profile/bio', {bio: bio});
  }

  removePicture(pictureId: string){
    let params = new HttpParams();

    params = params.append('id', pictureId);

    return this.httpClient.delete(this.baseUrl + '/user-service/profile/picture', {params})
  }

  changePicturePosition(picturePositionChange: PicturePositionChange){
    return this.httpClient.put(this.baseUrl + '/user-service/profile/change-picture-position', picturePositionChange);
  }

  addPicture(picture: File){
    return this.httpClient.post<ApiResponse<Picture>>(this.baseUrl + '/user-service/profile/picture', picture)
      .pipe(map(response => {
        if(response.result)
          return response.result;
        else
          throw new Error('Response body should contain Picture entity');
      }));
  }

  updateSchoolName(schoolName: string){
    return this.httpClient.put(this.baseUrl + '/user-service/profile/school-name', {schoolName: schoolName});
  }

  updateOccupation(occupation: string){
    return this.httpClient.put(this.baseUrl + '/user-service/profile/occupation', {occupation: occupation});
  }

  updateInfo(info: Info){
    return this.httpClient.put(this.baseUrl + '/user-service/profile/info',
      {titleId: info.id, answerId: info.answer!.id})
  }

  getAllInfo(){
    return this.httpClient.get<ApiResponse<any>>(this.baseUrl + '/user-service/info');
  }

  getInfoById(id: string){
    let params = new HttpParams();

    params = params.append('id', id);

    return this.httpClient.get<ApiResponse<InfoWithAnswers>>(this.baseUrl + '/user-service/info', {params});
  }
}
