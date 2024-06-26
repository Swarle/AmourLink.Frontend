import {Interaction} from "./interaction";
import {Profile} from "./profile";

export interface Feed{
  profile: Profile;
  interaction?: Interaction;
}
