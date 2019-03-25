import React, { Component } from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css'
import './App.css'
import './Components/Contact'
import './Components/ContactPost'
import Contact from './Components/Contact'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          Contacts
        </header>
        <Contact />
      </div>
    );
  }
}

export default App;
