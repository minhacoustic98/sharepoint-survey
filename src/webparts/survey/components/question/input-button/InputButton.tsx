import * as React from "react";
import { Option } from "../../ISurveyProps";

export default class InputButton extends React.Component<
{questionTitle: string, options:Option[],
onButtonClick: any, skip: boolean
}>
{
 
    handleButtonClick = (id:number) => {
        const nextQuestionId = id === 0 ? 2 : 3;
        const isSkip = id === 0 ? false : true;
        const value = id === 0 ? 'A' : 'B';
        this.props.onButtonClick(nextQuestionId,isSkip,value);
    }

    public render(): React.ReactElement {
        const {questionTitle, options} = this.props;

        return (
         <div className="form-group">
            <label htmlFor="">{questionTitle}</label>
            {
                options.map((option, index)=> (
                    <button 
                    onClick={()=>this.handleButtonClick(index)}
                    key={option.optionId}
                    className = {index === 0 ? 'btn btn-outline-primary d-block mb-2' : 'btn btn-outline-success d-block mb-2'}
                    >
                        {option.optionTitle}
                    </button>
                ))
            }
          </div>
        );
    }
}