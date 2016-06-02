import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

class Header extends React.Component {
  renderMenuItems() {
    const authenticated = this.props.authenticated;

    const sharedItems = [{ name: 'Home', route: '/', index: true }];
    const authItems = [
      { name: 'New Poll', route: '/newpoll' },
      { name: 'Profile', route: '/profile' },
      { name: 'Sign Out', route: '/signout' }
    ];
    const guestItems = [
      { name: 'Sign In', route: '/signin' },
      { name: 'Sign Up', route: '/signup' }
    ];

    const combinedItems = sharedItems.concat(authenticated ? authItems : guestItems);

    const menuItems = combinedItems.map((item, index) => (
      item.index ?
      <IndexLinkContainer to={item.route} key={index}>
        <NavItem>{item.name}</NavItem>
      </IndexLinkContainer> :
      <LinkContainer to={item.route} key={index}>
        <NavItem>{item.name}</NavItem>
      </LinkContainer>
    ));

    return menuItems;
  }

  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">Wanna Vote?</IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.renderMenuItems()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null, null, { pure: false })(Header);
