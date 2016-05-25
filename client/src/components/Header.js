import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends React.Component {
  renderLinks() {
    if (this.props.authenticated) {
      return <li className="nav-item">
        <Link to="/signout">Sign Out</Link>
      </li>
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <Link to="/" className="navbar-brand">Redux Auth</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
