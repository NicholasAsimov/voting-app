import { GET_POLLS } from '../constants/ActionTypes';

export default function polls(state = [], action) {
  switch (action.type) {
    case GET_POLLS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
