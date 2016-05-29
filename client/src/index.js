import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import RequireAuth from './components/auth/RequireAuth';

import App from './components/App';
import Polls from './components/Polls'
import Profile from './components/Profile';

import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';


import reducers from './reducers';
import { AUTH_USER } from './constants/ActionTypes';
import { getPolls } from './actions';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 56, // Instead of 64
  },
});

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If user has a token, consider him signed in
if (token) {
  store.dispatch({ type: AUTH_USER })
}

// Populate store with polls
store.dispatch(getPolls());

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Polls} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={RequireAuth(Profile)} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root'));
