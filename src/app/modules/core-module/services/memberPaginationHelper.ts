import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginatedMemberResult} from "../../../models/pagiantion/memberPagination";
import {ApiResponse} from "../../../models/apiInfrastructure/apiResponse";
import {map} from "rxjs";
import {Feed} from "../../../models/feed";
import {inject} from "@angular/core";
import {SessionService} from "./session.service";

export function getMemberPaginatedResult(url: string, params: HttpParams, httpClient: HttpClient, sessionService: SessionService){
  const paginatedResult = new PaginatedMemberResult();

 if(params.get('pageNumber') === '1')
   sessionService.clearInteraction();

 const interaction = sessionService.getInteraction();

  return httpClient.post<ApiResponse<Feed>>(url,interaction, {observe: 'response',params: params}).pipe(
    map(response => {
      if(response.body){
        paginatedResult.result = response.body.result?.member;

        if(response.body.result?.interaction){
          sessionService.setInteraction(response.body.result.interaction);
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
