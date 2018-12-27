import isEmpty from '../validation/is-empty';

import {
  ADD_CHILDREN,
  ADD_SUBSCRIPTION_TO_CHILDREN,
  LOGOUT_ADDCHILDREN
} from '../actions/types';

const initialState = {
  childDetails: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CHILDREN:
      return {
        ...state,
        childDetails: action.payload
      };
    case ADD_CHILDREN:
      return {
        ...state,
        childDetails: action.payload
      };
    case LOGOUT_ADDCHILDREN:
      return {
        ...state,
        childDetails: {}
      };
    default:
      return state;
  }
}
