import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Preference} from "../../../models/preference";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  public baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getUserPreference(){
    return this.httpClient.get<Preference>(this.baseUrl + '/recommendation-service/preference',
      {observe: 'response'})
      .pipe(map(response => {
          if(response.body)
            return response.body;
          else
            throw new Error("Empty body of response");
      }));
  }

  updatePreference(preference: Preference){
    return this.httpClient.put(this.baseUrl + '/recommendation-service/preference',
      preference);
  }
}
