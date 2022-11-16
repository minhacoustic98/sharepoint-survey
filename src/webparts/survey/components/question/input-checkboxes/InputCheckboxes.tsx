import * as React from "react";
import { Option } from "../../ISurveyProps";
import { ICheckboxState } from "../../ISurveyState";

export default class InputCheckboxes extends React.Component<
  {
    questionTitle: string;
    options: Option[];
    selectedItems: any
  },
  { selectedCheckboxes: Array<ICheckboxState> }
> {
  constructor(
    props = {
      questionTitle: "",
      options: [] as Option[],
      selectedItems: Function
    }
  ) {
    super(props);
    this.state = {
      selectedCheckboxes: [],
    };
  }

  onChange(id: number, value: any) {
    const selectedCheckboxes = this.state.selectedCheckboxes;

    // Find index
    const findIdx = selectedCheckboxes.map(x=>x.id).indexOf(id);

    // Index > -1 means that the item exists and that the checkbox is checked
    // and in that case we want to remove it from the array and uncheck it
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push({ id: id, value: value });
    }

    this.setState({
      selectedCheckboxes: selectedCheckboxes,
    });

    this.props.selectedItems(selectedCheckboxes);
  }
  public render(): React.ReactElement {
    const { selectedCheckboxes } = this.state;
    const { questionTitle, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="">{questionTitle}</label>

        {options.map((option) => (
          <div key={option.optionId} className="custom-control custom-checkbox">
            <input
              id={"input-" + option.optionId}
              key={option.optionId}
              type={option.type}
              className="custom-control-input"
              onChange={() => this.onChange(option.optionId, option.value)}
              checked={selectedCheckboxes.map(x=>x.id).includes(option.optionId)}
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
    );
  }
}
