import { AnsweredItem, Question } from "./ISurveyProps";

export interface ISurveyState {
  userId: number;
  answeredList: AnsweredItem[];
  myList: AnsweredItem[];
  isViewResponse: boolean;
  isDisplay: boolean;
  myQuestions: Question[];
}

export interface ISurveyQuestionState {
  items: AnsweredItem[];
  isCompleted: boolean;
  currentQuestion: number;
  isSkip: boolean;
}

export interface ICheckboxState {
  id: number;
  value: string;
}
