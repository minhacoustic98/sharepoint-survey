import * as React from "react";
import { Star } from '../star/Star';

interface AppProps {
    starCount: number;
  }
  interface AppState {
    rate: number;
    potentialRate?: number;
  }

export class Rating extends React.Component<AppProps, AppState> {  
    constructor(props: AppProps) {
      super(props);
      this.state = {
        rate: 0,
        potentialRate: 0
      }
    }
    static defaultProps = { starCount: 5 }
    setRate(rate:number): void {
      if (!this.state.rate) {
        this.setState({ rate: rate });
      }
    }
  
    readyToRate(potentialRate = 0):void {
      if (!this.state.rate) {
        this.setState({ potentialRate });
      }
    }
  
    reset(): void {
      this.setState({ rate: 0 });
      
      
    }
  
    render() {
        const rate = this.state.rate;
        
        return (
          <div
            className="ratingControl"
            onMouseLeave={() => { this.readyToRate() }}>
            {
                
              Array(this.props.starCount).fill(0).map((m, x) => {
                return (
                  <Star
                    key = {x}
                    potentialRate={this.state.potentialRate}
                    readyToRate={this.readyToRate.bind(this)}
                    setRate={this.setRate.bind(this)}
                    selected={rate > x}
                    val={x + 1}
                  />
                );
              })
            }
            <span
              onClick={() => { this.reset() }}
              style={{ cursor: "pointer", display: (rate > 0) ? "block" : "none" }}>&#x27f2; Try again</span>
          </div>
        );
      }
  }