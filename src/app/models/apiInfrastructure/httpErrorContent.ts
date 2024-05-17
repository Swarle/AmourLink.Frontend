import {ApiResponse} from "./apiResponse";

export class HttpErrorContent<TEntity>{
  constructor(public body: ApiResponse<TEntity>, public status: number) {
  }
}
