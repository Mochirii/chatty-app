import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navbar-user-counter">{this.props.usersOnline} users online</div>
      </nav>
    )
  }
}
export default NavBar;