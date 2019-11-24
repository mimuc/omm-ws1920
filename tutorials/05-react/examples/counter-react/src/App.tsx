import React from 'react';
import './App.css';
import OmmCounter from './components/omm-counter/omm-counter';
import Parent from './components/omm-props/parent';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="header"><h1>Counter - React</h1></div>
      <OmmCounter />
      {/* <Parent /> */}
    </div>
  );
}

export default App;