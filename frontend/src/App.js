import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Components/Contact'
import './Components/ContactForm'
import Contact from './Components/Contact';
import ContactForm from './Components/ContactForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactForm />
        <hr />
        <Contact />
      </div>
    );
  }
}

export default App;
