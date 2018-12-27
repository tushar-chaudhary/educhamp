import isEmpty from '../validation/is-empty';

import {
  SET_CURRENT_USER,
  SET_SUBSCRIPTION,
  LOGOUT,
  RESET_PASSWORD,
  LOGIN_CHILD,
  EDIT_PARENT_PROFILE,
  EDIT_PARENT_PASSWORD,
  EDIT_CHILD_PROFILE,
  EDIT_CHILD_PASSWORD,
  SKIP_SUBSCRIPTION
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        user: {}
      };
    case SET_SUBSCRIPTION:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case LOGIN_CHILD:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case RESET_PASSWORD:
      return {
        ...state
      };
    case EDIT_PARENT_PROFILE:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case EDIT_CHILD_PROFILE:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case EDIT_PARENT_PASSWORD:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case EDIT_CHILD_PASSWORD:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SKIP_SUBSCRIPTION:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
