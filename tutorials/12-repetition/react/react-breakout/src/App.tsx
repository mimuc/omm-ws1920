import React from 'react';
import './App.css';
import Dog from "./Dog";
import {DogProps} from "./DogProps";

class App extends React.Component {
    state = {
        dogs:  [
            {name:"Frido",age:3},
            {name:"Wuffi",age:6},
            {name:"Bello",age:5}
        ]
    }

    incDogAge(dog: DogProps){
      // TODO maybe you will need this for task 2
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div><Dog name={this.state.dogs[0].name} age={this.state.dogs[0].age} /></div>
                    <div><Dog name={this.state.dogs[1].name} age={this.state.dogs[1].age} /></div>
                    <div><Dog name={this.state.dogs[2].name} age={this.state.dogs[2].age} /></div>
                </header>
            </div>
        );
    }
}

export default App;
