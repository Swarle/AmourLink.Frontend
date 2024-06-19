import {ResponseType} from "./response-type";

export interface ApiResponse<TEntity>{
  responseType: string;
  result?: TEntity;
  errorMessages: Map<string, string>;
}
