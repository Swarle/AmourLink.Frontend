import {UserSentLike} from "./user-sent-like";

export interface LikesAndMatches{
  matchedUserIds: string[];
  userSentLike: UserSentLike[];
  userSentSuperLike: UserSentLike[];
}
