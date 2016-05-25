import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from '../constants/ActionTypes';

const API_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return dispatch => {
    // Submit email/password to the server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: types.AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function signupUser({ email, password }) {
  return dispatch => {
    // Submit email/password to the server
    axios.post(`${API_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: types.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.data.error)));
  };
}

export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: types.UNAUTH_USER };
}

export function fetchMessage() {
  return dispatch => {
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log(response);
      });
  };
}
