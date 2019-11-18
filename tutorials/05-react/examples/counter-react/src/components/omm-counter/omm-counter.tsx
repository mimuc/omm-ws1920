import React, {Component} from 'react'
import './omm-counter.css'
export default class OmmCounter extends Component {
  state = { count: 0 }
  inc = () => { this.setState({count: (this.state.count + 1)}) }
  dec = () => { this.setState({count: (this.state.count - 1)}) }
  render() {
    return (
      <div className="counter">
        <span className="counter-state">{ this.state.count }</span>
        <div className="buttons">
          <button onClick={this.inc}>+</button>
          <button onClick={this.dec}>-</button>
        </div>
      </div>
    )
    // Pure TS call
    // return React.createElement('div', null, 
    //           React.createElement('span', null, this.state.count),
    //           React.createElement('div', null, 
    //             React.createElement('button', {onClick: this.inc}, '+'),
    //             React.createElement('button', {onClick: this.dec}, '-')))
  }
}