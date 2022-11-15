import {
  DateConvention,
  DateTimePicker
} from "@pnp/spfx-controls-react/lib/DateTimePicker";
import * as React from "react";
import { ISurveyQuestionProps } from "../ISurveyProps";
import { ISurveyQuestionState } from "../ISurveyState";
import { Rating } from "./rating/Rating";

export default class SurveyQuestion extends React.Component<
  ISurveyQuestionProps,
  ISurveyQuestionState
> {
  constructor(props: ISurveyQuestionProps) {
    super(props);
    this.state = {
      items: [],
    };
  }

  public render(): React.ReactElement {
    const { items } = this.props;
    return (
      <div className="mt-4">
        <h6 style={{ color: "red" }}>
          <u>Please anwser the questions bellow:</u>
        </h6>
        <form className="mt-3">
          <div className="form-group">
            <label htmlFor="">{items[0].questionTitle}</label>
            <button
              key={items[0].options[0].optionId}
              className="btn btn-outline-primary d-block mb-2"
            >
              {items[0].options[0].optionTitle}
            </button>
            <button
              key={items[0].options[0].optionId}
              className="btn btn-outline-success d-block mb-2"
            >
              {items[0].options[1].optionTitle}
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="">{items[1].questionTitle}</label>

            {items[1].options.map((option) => (
              <div
                key={option.optionId}
                className="custom-control custom-checkbox"
              >
                <input
                  id={"input-" + option.optionId}
                  key={option.optionId}
                  type={option.type}
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label"
                  htmlFor={"input-" + option.optionId}
                >
                  {option.optionTitle}
                </label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="">{items[2].questionTitle}</label>
            <DateTimePicker
              label="Choose your birthday"
              showLabels={false}
              dateConvention={DateConvention.Date}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">{items[3].questionTitle}</label>
            <Rating starCount={5}/>
          </div>

          <div className="form-group">
            <button type="submit" className="btn-sm btn-success">Send your response</button>
          </div>
        </form>
      </div>
    );
  }
}
