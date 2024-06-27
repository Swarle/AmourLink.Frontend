import {Role} from "../api-infrastructure/role";

export interface User{
  id: string;
  token: string;
  email: string;
  enabled: boolean;
  roles: Role[];
  accessTokenExpired: Date;
  refreshToken: string;
  name: string;
}
