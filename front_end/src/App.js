import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import './css/materialize.css'
import './css/style.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      logged : false
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
        <Navbar logged={this.state.logged} loggedOut={this.loggedOut}/>
        <Menu/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
