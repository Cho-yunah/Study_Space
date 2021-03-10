import React from 'react';
import './App.css';
import MyComponent from './MyComponent';
import { Counter } from './Counter';
import { Info } from './Info';
import { Average } from './Average';

const App = () => {
  return (
    <div>
      <MyComponent className="react">리액트</MyComponent>
      <Counter />
      <Info />
      <Average />
    </div>
  );
};

export default App;
