import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Components/Contact'
import Contact from './Components/Contact';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Contact />
      </div>
    );
  }
}

export default App;
