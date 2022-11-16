export interface ISurveyProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  userEmail: string;
}

export interface IUserProfileProps {
  userName: string;
  userEmail: string;
}

export interface IConditionalButtonProps {
  isViewResponse: boolean;
  handleClick: any;
}

export enum ButtonTitle {
  ViewRespose = "View My Response",
  StartSurvey = "Start Survey",
}

export interface IAnsweredItem {
  Title: string;
  UsernameId: number;
  Question: string;
  Answer: string | string[];
  Created: Date;
  Modified: Date;
}

export class AnsweredItem implements IAnsweredItem {
  Title: string;
  UsernameId: number;
  Question: string;
  Answer: string | string[];
  UserDisplayName: string;
  Created: Date;
  Modified: Date;

  constructor(answer: IAnsweredItem) {
    this.Title = answer.Title;
    this.UsernameId = answer.UsernameId;
    this.Question = answer.Question;
    this.Answer = answer.Answer;
    this.Created = answer.Created;
    this.Modified = answer.Modified;
  }
}

export interface IAnsweredList {
  items: AnsweredItem[];
  owner: string;
}

export enum AnswerType {
  Button = "Button",
  Checkbox = "Checkbox",
  DateControl = "Date",
  Rating = "Rating",
}

export interface Option {
  optionId: number;
  optionTitle: string;
  type: AnswerType;
  value: string | string[] | Date | number;
  displayValue: string;
  previousQuestion?: number;
  nextQuestion?: number;
}

export interface Question {
  options: Option[];
  id: number;
  questionTitle: string;
}

export interface ISurveyQuestionProps {
  items: Question[];
  userId: number;
  userDisplay: string;
}
