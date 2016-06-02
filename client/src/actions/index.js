import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';

const API_URL = 'http://localhost:3090';

function authUser(dispatch, api_endpoint, email, password) {
  axios.post(`${API_URL}/${api_endpoint}`, { email, password })
    .then(response => {
      dispatch({ type: types.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/profile');
    })
    .catch(response => {
      if (api_endpoint == 'signin') {
        dispatch(authError('Wrong email or password'));
      } else {
        dispatch(authError(response.data.error));
      }
    });
}

export function signinUser({ email, password }) {
  return dispatch => {
    authUser(dispatch, 'signin', email, password);
  };
}

export function signupUser({ email, password }) {
  return dispatch => {
    authUser(dispatch, 'signup', email, password);
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: types.UNAUTH_USER };
}

export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}

export function getPolls() {
  return dispatch => {
    axios.get(`${API_URL}/api/polls`)
      .then(response => {
        dispatch({
          type: types.GET_POLLS,
          payload: response.data
        });
      });
  };
}

export function vote({ id, choice }) {
  return dispatch => {
    axios.post(`${API_URL}/api/poll`, { id, choice })
      .then(response => {
        dispatch({
          type: types.VOTE,
          payload: response.data
        });
      })
      // User already voted
      .catch(response => window.alert('You already voted'))
  };
}

export function getUserInfo() {
  return dispatch => {
    axios.get(`${API_URL}/api/user`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: types.GET_USER_INFO,
          payload: response.data
        });
      });
  };
}

export function removePoll({ id, authorEmail }) {
  return dispatch => {
    axios.post(`${API_URL}/api/poll/delete`, { id, authorEmail }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: types.REMOVE_POLL,
          payload: id
        });
      });
  };
}

export function addPoll({ title, choices }) {
  return dispatch => {
    axios.post(`${API_URL}/api/polls`, { title, choices }, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: types.ADD_POLL,
          payload: response.data
        });
      });
  };
}
