import { AnswerType, Question } from "../components/ISurveyProps";

export const data: Question[] = [
  {
    questionTitle:
      "Question 1 -- This is Question 1. If you select Answer A, your next question will be Question 2. If you select Answer B, your next question will be Question 3.",
    id: 1,
    options: [
      {
        optionId: 10,
        optionTitle: "(A) Answer A, Go to Question 2",
        type: AnswerType.Button,
        value: "A",
        displayValue: "A",
        previousQuestion: null,
        nextQuestion: 2,
      },
      {
        optionId: 11,
        optionTitle: "(B) Answer A, Go to Question 3",
        type: AnswerType.Button,
        value: "B",
        displayValue: "B",
        previousQuestion: null,
        nextQuestion: 2,
      },
    ],
  },
  {
    questionTitle:
      "Question 2 -- What are your favorite programming languages? Please select 2.",
    id: 2,
    options: [
      {
        optionId: 20,
        optionTitle: "(A) C#",
        type: AnswerType.Checkbox,
        value: "A",
        displayValue: "C#",
        previousQuestion: 1,
        nextQuestion: 3,
      },
      {
        optionId: 21,
        optionTitle: "(B) Java",
        type: AnswerType.Checkbox,
        value: "B",
        displayValue: "Java",
        previousQuestion: 1,
        nextQuestion: 3,
      },
      {
        optionId: 22,
        optionTitle: "(C) PHP",
        type: AnswerType.Checkbox,
        value: "C",
        displayValue: "PHP",
        previousQuestion: 1,
        nextQuestion: 3,
      },
      {
        optionId: 23,
        optionTitle: "(D) Python",
        type: AnswerType.Checkbox,
        value: "D",
        displayValue: "Python",
        previousQuestion: 1,
        nextQuestion: 3,
      },
      {
        optionId: 24,
        optionTitle: "(E) R",
        type: AnswerType.Checkbox,
        value: "E",
        displayValue: "R",
        previousQuestion: 1,
        nextQuestion: 3,
      },
    ],
  },
  {
    questionTitle: "Question 3 -- When is your birthday?",
    id: 3,
    options: [
      {
        optionId: 30,
        optionTitle: null,
        type: AnswerType.DateControl,
        value: null,
        displayValue: null,
        previousQuestion: 1,
        nextQuestion: 4,
      },
    ],
  },
  {
    questionTitle: "Question 4 -- Please rate this survey",
    id: 4,
    options: [
      {
        optionId: 40,
        optionTitle: null,
        type: AnswerType.Rating,
        value: 0,
        displayValue: "0",
        previousQuestion: 3,
        nextQuestion: null,
      },
    ],
  },
];
