import {Profile} from "../profile";

export interface MemberPagination{
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedMemberResult{
  result?: Profile;
  pagination?: MemberPagination;
}
