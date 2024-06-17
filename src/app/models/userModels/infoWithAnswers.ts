import {Answer} from "./answer";

export interface InfoWithAnswers{
  id: string;
  title: string;
  answers: Answer[];
}
