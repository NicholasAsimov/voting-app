import { GET_POLLS, VOTE } from '../constants/ActionTypes';

export default function polls(state = [], action) {
  switch (action.type) {
    case GET_POLLS:
      return [...state, ...action.payload];
    case VOTE:
      return state.map(poll => {
        if (poll._id === action.payload._id) {
          return action.payload;
        }

        return poll;
      });
    default:
      return state;
  }
}
