import {Picture} from "./userModels/picture";
import {Degree} from "./userModels/degree";
import {Info} from "./userModels/info";

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
