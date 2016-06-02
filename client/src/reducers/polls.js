import { GET_POLLS, VOTE, ADD_POLL, REMOVE_POLL } from '../constants/ActionTypes';

export default function polls(state = [], action) {
  switch (action.type) {
    case GET_POLLS:
      return [...state, ...action.payload];
    case VOTE:
      return state.map(poll => poll._id === action.payload._id ? action.payload : poll);
    case ADD_POLL:
      return [action.payload, ...state];
    case REMOVE_POLL:
      return state.filter(poll => poll._id !== action.payload);
    default:
      return state;
  }
}
