import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import polls from './polls';

const rootReducer = combineReducers({
  form,
  auth,
  polls
});

export default rootReducer;
