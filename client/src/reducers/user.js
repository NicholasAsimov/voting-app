import { GET_USER_INFO, UNAUTH_USER } from '../constants/ActionTypes';

export default function user(state = {}, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return { ...action.payload };
    case UNAUTH_USER:
      return {};
    default:
      return state;
  }
}
