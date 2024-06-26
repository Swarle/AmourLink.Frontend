import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginatedMemberResult} from "../../../models/pagiantion/member-pagination";
import {ApiResponse} from "../../../models/api-infrastructure/api-response";
import {map} from "rxjs";
import {Feed} from "../../../models/feed";
import {SessionService} from "./session.service";

export function getMemberPaginatedResult(url: string, params: HttpParams, httpClient: HttpClient, sessionService: SessionService){
  const paginatedResult = new PaginatedMemberResult();

 if(params.get('pageNumber') === '1')
   sessionService.clearInteraction();

 const interaction = sessionService.getInteraction();

  return httpClient.post<Feed>(url,interaction, {observe: 'response',params: params}).pipe(
    map(response => {
      if(response.body){
        paginatedResult.result = response.body.member;

        if(response.body.interaction){
          sessionService.setInteraction(response.body.interaction);
        }

      }
      const pagination = response.headers.get('Pagination');
      if(pagination){
        paginatedResult.pagination = JSON.parse(pagination);
      }
      return paginatedResult;
    })
  )
}
