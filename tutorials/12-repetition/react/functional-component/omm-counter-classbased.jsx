import React, {Component} from 'react'

class OmmCounter extends Component {
    state = { count: 0 }
    inc = () => { this.setState({count: (this.state.count + 1)}) }
    dec = () => { this.setState({count: (this.state.count - 1)}) }
    render() {
        return (
            <div><span>{ this.state.count }</span>
                <button onClick={this.inc}>+</button>
                <button onClick={this.dec}>-</button>
            </div></div>
        )  }}
export default OmmCounter;
