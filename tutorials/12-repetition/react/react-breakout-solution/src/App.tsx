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
        let dogs = this.state.dogs;
        for(let i = 0; i<dogs.length; i++){
           if (dogs[i].name == dog.name){
               dogs[i].age+=1
           }
           this.setState({
               dogs: dogs
           })
       }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {
                        this.state.dogs.map(dog => (<div><Dog name={dog.name} age={dog.age} inc={() => {this.incDogAge(dog)}}/></div>))
                    }
                </header>
            </div>
        );
    }
}

export default App;
