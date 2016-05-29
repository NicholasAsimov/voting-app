import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import polls from './polls';
import user from './user';

const rootReducer = combineReducers({
  form,
  auth,
  polls,
  user
});

export default rootReducer;
