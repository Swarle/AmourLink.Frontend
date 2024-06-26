import {Picture} from "./user-models/picture";
import {Degree} from "./user-models/degree";
import {Info} from "./user-models/info";
import {Hobby} from "./hobby";
import {Tag} from "./user-models/tag";

export interface Profile{
  id: string;
  firstname: string;
  lastname?: string;
  nationality?: string;
  height?: number;
  age: number;
  gender: string;
  bio: string;
  location?: {
    latitude: number,
    longitude: number
  }
  occupation?: string;
  pictures: Picture[],
  degree?: Degree;
  hobbies: Hobby[];
  info: Info[],
  tags: Tag[];
}
