import {
  DateConvention,
  DateTimePicker
} from "@pnp/spfx-controls-react/lib/DateTimePicker";
import * as moment from "moment";
import * as React from "react";
import { AnsweredItem, ISurveyQuestionProps } from "../ISurveyProps";
import { ICheckboxState, ISurveyQuestionState } from "../ISurveyState";
import InputButton from "./input-button/InputButton";
import InputCheckboxes from "./input-checkboxes/InputCheckboxes";
import { Rating } from "./rating/Rating";
export default class SurveyQuestion extends React.Component<
  ISurveyQuestionProps,
  ISurveyQuestionState
> {
  constructor(props: ISurveyQuestionProps) {
    super(props);
    this.state = {
      items: [],
      currentQuestion: 1,
      isCompleted: false,
      isSkip: false,
      yearDiff: 0,
      monthDiff: 0,
    };
  }

  handleButtonChanges = (
    nextQuestionId: number,
    skip: boolean,
    value: string
  ) => {
    const aws: AnsweredItem = {
      Title: this.props.items[0].questionTitle,
      UsernameId: this.props.userId,
      Answer: value,
      Created: new Date().toLocaleDateString(),
      Modified: new Date().toLocaleDateString(),
      Question: "Question 1",
      UserDisplayName: this.props.userDisplay,
    };
    const list = this.state.items;
    list.push(aws);
    this.setState({
      currentQuestion: nextQuestionId,
      isSkip: skip,
      items: list,
    });
  };

  handlePrevClick = () => {
    const idx = this.state.currentQuestion;
    const anwserList = this.state.items;
    switch (idx) {
      case 1:
        return;
      case 2:
        this.setState({ currentQuestion: 1 });
        break;
      case 3:
        if (this.state.isSkip) {
          this.setState({ currentQuestion: 1 });
        } else {
          this.setState({ currentQuestion: 2 });
        }
        break;
      case 4:
        this.setState({ currentQuestion: 3 });
        break;
      default:
        return;
    }
  };

  handleNextButtonClick = () => {
    const idx = this.state.currentQuestion;
    switch (idx) {
      case 4:
      case 1:
        return;
      case 2:
        if (!this.isCheckboxValid()) {
          alert("Please choose at least 2 options!");
          return;
        }
        this.setState({ currentQuestion: 3 });
        break;
      case 3:
        if (!this.isCheckDateValid()) {
          alert("Please choose your birthday!");
          return;
        }
        this.setState({ currentQuestion: 4 });
        break;
      default:
        return;
    }
  };

  handleCheckboxes = (arr: Array<ICheckboxState>) => {
    const val = arr.map((x) => x.value);
    if (this.state.items.filter((x) => x.Question === "Question 2").length) {
      const result = this.state.items.map((obj) => {
        if (obj.Question === "Question 2") {
          obj.Answer = val.join(",");
          return obj;
        }
        return obj;
      });
      this.setState({ items: result });
    } else {
      const ans: AnsweredItem = {
        Title: this.props.items[1].questionTitle,
        UsernameId: this.props.userId,
        Answer: val.join(","),
        Created: new Date().toLocaleDateString(),
        Modified: new Date().toLocaleDateString(),
        Question: "Question 2",
        UserDisplayName: this.props.userDisplay,
      };
      const list = this.state.items;
      list.push(ans);
      this.setState({ items: list });
    }
  };

  handleDateChanges = (val: Date) => {
    const arg = val;
    const [year, month] = this.caculateDiff(val);
    if (this.state.items.find((x) => x.Question === "Question 3")) {
      const result = this.state.items.map((obj) => {
        if (obj.Question === "Question 3") {
          obj.Answer = arg.toLocaleDateString();
          return obj;
        }
        return obj;
      });
      this.setState({ items: result, yearDiff: year, monthDiff: month });
    } else {
      const ans: AnsweredItem = {
        Title: this.props.items[2].questionTitle,
        UsernameId: this.props.userId,
        Answer: arg.toLocaleDateString(),
        Created: new Date().toLocaleDateString(),
        Modified: new Date().toLocaleDateString(),
        Question: "Question 3",
        UserDisplayName: this.props.userDisplay,
      };
      const list = this.state.items;
      list.push(ans);
      this.setState({ items: list, yearDiff: year, monthDiff: month });
    }
  };

  handleRatingChange = (val: number) => {
    const arg = val;
    if (this.state.items.find((x) => x.Question === "Question 4")) {
      const result = this.state.items.map((obj) => {
        if (obj.Question === "Question 4") {
          obj.Answer = val.toString();
          return obj;
        }
        return obj;
      });
      this.setState({ items: result });
    } else {
      const ans: AnsweredItem = {
        Title: this.props.items[3].questionTitle,
        UsernameId: this.props.userId,
        Answer: arg.toString(),
        Created: new Date().toLocaleDateString(),
        Modified: new Date().toLocaleDateString(),
        Question: "Question 4",
        UserDisplayName: this.props.userDisplay,
      };
      const list = this.state.items;
      list.push(ans);
      this.setState({ items: list });
    }
  };

  handleSubmit = () => {
    if (!this.isCheckRating()) {
      alert("Please rate this survey!");
      return;
    }
    const items = this.state.items;
    this.props.newRecord(items);
  };

  isCheckboxValid(): boolean {
    let isValid = false;
    const answer = this.state.items.find((x) => x.Question === "Question 2");
    if (answer) {
      if (answer.Answer.length >= 2) isValid = true;
    }

    return isValid;
  }

  isCheckDateValid(): boolean {
    let isValid = false;
    const answer = this.state.items.find((x) => x.Question === "Question 3");
    if (answer && answer.Answer !== "") isValid = true;

    return isValid;
  }

  isCheckRating(): boolean {
    let isValid = false;
    const answer = this.state.items.find((x) => x.Question === "Question 4");
    if (answer && answer.Answer !== "") isValid = true;

    return isValid;
  }

  caculateDiff = (date: Date) => {
    const yourBithday = moment(date);
    const now = moment(new Date());

    const yearDiff = now.diff(yourBithday, "years");
    const monthDiff = now.diff(yourBithday, "months");

    return [yearDiff, monthDiff];
  };
  public render(): React.ReactElement {
    const { items } = this.props;
    return (
      <div className="mt-4">
        <h6 style={{ color: "red" }}>
          <u>Please anwser the questions bellow:</u>
        </h6>
        <form className="mt-3" action="#">
          {this.state.currentQuestion === 1 && (
            <InputButton
              options={items[0].options}
              questionTitle={items[0].questionTitle}
              onButtonClick={this.handleButtonChanges}
              skip={this.state.isSkip}
            />
          )}
          {this.state.currentQuestion === 2 && (
            <InputCheckboxes
              options={items[1].options}
              questionTitle={items[1].questionTitle}
              selectedItems={this.handleCheckboxes}
            />
          )}

          {this.state.currentQuestion === 3 && (
            <div className="form-group">
              <label htmlFor="">{items[2].questionTitle}</label>
              <DateTimePicker
                label="Choose your birthday"
                showLabels={false}
                dateConvention={DateConvention.Date}
                onChange={this.handleDateChanges}
              />
              {this.state.monthDiff !== 0 && this.state.yearDiff !== 0 && (
                <p className="mt-2">
                  You are {this.state.yearDiff} years and {this.state.monthDiff}{" "}
                  months old
                </p>
              )}
            </div>
          )}

          {this.state.currentQuestion === 4 && (
            <div className="form-group">
              <label htmlFor="">{items[3].questionTitle}</label>
              <Rating starCount={5} rateValue={this.handleRatingChange} />
            </div>
          )}

          <div className="form-group">
            {this.state.currentQuestion === 4 && (
              <button
                onClick={this.handleSubmit}
                type="button"
                className="btn-sm btn-success"
              >
                Send your response
              </button>
            )}
            <div
              className="btn-group"
              style={{ float: "right" }}
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-dark"
                onClick={this.handleNextButtonClick}
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
