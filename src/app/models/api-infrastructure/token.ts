export interface Token{
  jti: string;
  roles: string[];
  sub: string;
  exp: number;
  name: string;
  mainPhoto: string;
}
