export interface User{
  id: string;
  token: string;
  email: string;
  roles: string[];
  accessTokenExpired: Date;
  refreshToken: string;
  name: string;
}
