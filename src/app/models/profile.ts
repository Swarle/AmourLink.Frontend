import {Picture} from "./user-models/picture";
import {Degree} from "./user-models/degree";
import {Info} from "./user-models/info";

export interface Profile{
  firstName: string;
  lastName?: string;
  nationality: string;
  age: number;
  gender: string;
  bio: string;
  occupation: string;
  pictures: Picture[],
  degree: Degree;
  info: Info[],

}
