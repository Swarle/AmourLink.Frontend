import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginatedMemberResult} from "../../../models/pagiantion/memberPagination";
import {ApiResponse} from "../../../models/apiInfrastructure/apiResponse";
import {Member} from "../../../models/userModels/member";
import {map} from "rxjs";

export function getMemberPaginatedResult(url: string, params: HttpParams, httpClient: HttpClient){
  const paginatedResult = new PaginatedMemberResult();

  return httpClient.get<ApiResponse<Member>>(url, {observe: 'response',params: params}).pipe(
    map(response => {
      if(response.body){
        paginatedResult.result = response.body.result;
      }
      const pagination = response.headers.get('Pagination');
      if(pagination){
        paginatedResult.pagination = JSON.parse(pagination);
      }
      return paginatedResult;
    })
  )
}
