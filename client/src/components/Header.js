import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0'
};

class Header extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  renderMenuItems() {
    const sharedItems = [{ name: 'Home', route: '/' }];
    const authItems = [
      { name: 'Profile', route: '/profile' },
      { name: 'Sign Out', route: '/signout' }
    ];
    const guestItems = [
      { name: 'Sign In', route: '/signin' },
      { name: 'Sign Up', route: '/signup' }
    ];

    let combinedItems;

    if (this.props.authenticated) {
      combinedItems = sharedItems.concat(authItems);
    } else {
      combinedItems = sharedItems.concat(guestItems);
    }

    const menuItems = combinedItems.map((item, index) => (
      <MenuItem
        linkButton
        containerElement={<Link to={item.route} />}
        onTouchTap={this.handleClose}
        primaryText={item.name}
        key={index}
      />
    ));

    return menuItems;
  }

  render() {
    return (
      <div>
        <AppBar
          title="Wanna Vote?"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
      <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={(open) => this.setState({ open })}
      >
        {this.renderMenuItems()}
      </Drawer>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
