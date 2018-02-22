import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <img className="logo" src="bubble.png" />
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="user_count">{this.props.userCount} users online</p>
      </nav>
    );
  }
}

export default Navbar;