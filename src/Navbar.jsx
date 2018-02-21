import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
      <img className="logo" src="bubble.png" />
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}

export default Navbar;