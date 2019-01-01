import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import addChildrenReducer from './addChildrenReducer';
import testReducer from './testReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  childSubscription: addChildrenReducer,
  results: testReducer
});
