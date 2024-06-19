import {ApiResponse} from "./api-response";

export class HttpErrorContent<TEntity>{
  constructor(public body: ApiResponse<TEntity>, public status: number) {
  }
}
