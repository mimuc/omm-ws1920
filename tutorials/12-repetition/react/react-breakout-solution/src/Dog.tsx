import React, { Component } from 'react';
interface Props { name: string, age: number, inc: any }
 class Dog extends Component<Props> {

    render() {
        return (<div>
            <div>name: {this.props.name}</div>
            <div>age: {this.props.age}</div>
            <input type="button" onClick={this.props.inc} value="+"></input>
        </div>)
    }}

    export default Dog