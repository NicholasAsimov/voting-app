import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import RequireAuth from './components/auth/RequireAuth';

import App from './components/App';
import Polls from './components/Polls';
import Poll from './components/Poll';
import NewPoll from './components/NewPoll';
import Profile from './components/Profile';

import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';

import reducers from './reducers';
import { AUTH_USER } from './constants/ActionTypes';
import { getPolls } from './actions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// Populate store with polls
store.dispatch(getPolls());

const token = localStorage.getItem('token');
// If user has a token, consider him signed in
if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Polls} />
        <Route path="/poll/:id" component={Poll} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={RequireAuth(Profile)} />
        <Route path="/newpoll" component={RequireAuth(NewPoll)} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
