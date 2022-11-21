import * as React from "react";
import styles from "../../Survey.module.scss";

interface IStarProp {
    selected: boolean,
    val: number,
    setRate: Function,
    readyToRate: Function,
    potentialRate: number
  }
  
  export class Star extends React.Component<IStarProp> {
    static defaultProps = {
      selected: false,
      potentialRate: 0
    }
  
    updateClassName() : string{
      const cl =
        this.props.selected ?
        styles.star + ' ' + styles.selected :
          (this.props.potentialRate >= this.props.val) ?
          styles.star + ' ' +styles.potentialSelect : styles.star;
      return cl;
    }
    render() : React.ReactElement {
      return (<span
        onClick={() => this.props.setRate(this.props.val)}
        onMouseEnter={() => this.props.readyToRate(this.props.val)}
        title={this.props.val.toString()}
        className={this.updateClassName()}>&#x2605;</span>)
    }
  }