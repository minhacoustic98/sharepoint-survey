import * as React from "react";

export default class Clock extends React.Component<any, any> {
  update: any;
  constructor(props: any) {
    super(props);
    this.state = { time: new Date() };
  }

  componentDidMount(): void {
    this.update = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.update);
  }

  public render(): React.ReactElement {
    return (
      <div>
        <p>
          Current date: <strong>{this.state.time.toLocaleDateString()}</strong>
        </p>
        <p>
          Current time: <strong>{this.state.time.toLocaleTimeString()}</strong>
        </p>
      </div>
    );
  }
}
