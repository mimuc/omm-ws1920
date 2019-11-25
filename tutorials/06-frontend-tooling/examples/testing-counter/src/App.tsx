import React from 'react';
import './App.css';
import OmmCounter from './components/omm-counter/omm-counter'

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="header"><h1>Counter - React Hooks</h1></div>
      <OmmCounter />
    </div>
  );
}

export default App;
