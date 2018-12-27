import isEmpty from '../validation/is-empty';

import {
  GET_CURRENT_USER,
  GET_QUESTIONS,
  GET_PROFILE,
  ADD_CHILDREN,
  LOGOUT_PROFILE,
  EDIT_PARENT_PROFILE
} from '../actions/types';

const initialState = {
  questions: {},
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case LOGOUT_PROFILE:
      return {
        ...state,
        questions: {},
        profile: {}
      };
    default:
      return state;
  }
}
