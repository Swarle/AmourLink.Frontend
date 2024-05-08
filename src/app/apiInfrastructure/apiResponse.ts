import {ResponseType} from "./responseType";

export interface ApiResponse<TEntity>{
  responseType: ResponseType;
  Result: TEntity;
  errorMessage: Map<string, string>;
}
