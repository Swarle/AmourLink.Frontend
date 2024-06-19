import {Member} from "./user-models/member";
import {Interaction} from "./interaction";

export interface Feed{
  member: Member;
  interaction?: Interaction;
}
