import {Role} from "./role";

export interface Token{
  jti: string;
  roles: Role[];
  sub: string;
  exp: number;
  enabled: boolean;
  name: string;
  mainPhoto: string;
}
