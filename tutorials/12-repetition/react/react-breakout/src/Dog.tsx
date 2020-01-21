import React, { Component } from 'react';
interface Props { name: string, age: number }
 class Dog extends Component<Props> {

    render() {
        return (<div>
            <div>name: {this.props.name}</div>
            <div>age: {this.props.age}</div>
            {/*TODO add a button to increment the age*/}
        </div>)
    }}

    export default Dog