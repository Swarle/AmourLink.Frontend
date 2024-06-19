import {Member} from "../user-models/member";

export interface MemberPagination{
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedMemberResult{
  result?: Member;
  pagination?: MemberPagination;
}
