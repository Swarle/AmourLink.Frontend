import {Picture} from "./picture";
import {Degree} from "./degree";
import {Info} from "./info";
import {Question} from "./question";

export interface Member{
  id: string;
  firstName: string;
  lastName?: string;
  age: number;
  bio?: string;
  height?: number;
  occupation?: string;
  nationality?: string;
  gender: string;
  location: {
    latitude: number,
    longitude: number
  }
  hobbies: string[];
  pictures: Picture[];
  degree?: Degree;
  infos?: Info[];
  questions?: Question[];
  languages?: string[];
  tags?: string[];
}
