import * as React from "react";
import { ButtonTitle, IConditionalButtonProps } from "../ISurveyProps";
import styles from "../Survey.module.scss";

export default class ConditionalButton extends React.Component<
  IConditionalButtonProps,
  any
> {
  public render(): React.ReactElement {
    const { isViewResponse, handleClick } = this.props;
    return (
      <button
        className={
          isViewResponse ? styles.viewResponseButton : styles.startSurveyButton
        }
        onClick={() => handleClick()}
      >
        {isViewResponse ? ButtonTitle.ViewRespose : ButtonTitle.StartSurvey}
      </button>
    );
  }
}
