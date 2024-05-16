import {ResponseType} from "./responseType";

export interface ApiResponse<TEntity>{
  responseType: string;
  result?: TEntity;
  errorMessages: Map<string, string>;
}
