import {ResponseType} from "./responseType";

export interface ApiResponse<TEntity>{
  responseType: ResponseType;
  isSuccess: boolean;
  Result: TEntity;
  errorMessage: Map<string, string>;
}
