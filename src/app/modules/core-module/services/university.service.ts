import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {School} from "../../../models/school";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private httpClient: HttpClient) { }

  getSchoolNames(universityName: string){
    return this.httpClient.get<School[]>('/university' + `/search?name=${universityName}`).pipe(
      map(response => {
        return response.map(university => university.name);
      })
    )
  }
}
