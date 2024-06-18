import {Member} from "./userModels/member";
import {Interaction} from "./interaction";

export interface Feed{
  member: Member;
  interaction?: Interaction;
}
