import React, { Component } from 'react';
interface ChildProps { name: string, age: number }
export default class Child extends Component<ChildProps> {
  render() {
    return (<div>
        <div>name: {this.props.name}</div>
        <div>age: {this.props.age}</div>
        {/* <div>role: {this.props.role} </div> */}
    </div>)
  }
}