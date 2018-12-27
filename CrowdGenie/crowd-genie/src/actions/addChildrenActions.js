import axios from 'axios';

import {
  ADD_CHILDREN,
  ADD_SUBSCRIPTION_TO_CHILDREN,
  ADD_CHILDREN_TO_PROFILE,
  GET_ERRORS
} from './types';

//Adding the children and their status
export const addChildren = userData => dispatch => {
  dispatch({
    type: ADD_CHILDREN,
    payload: userData
  });
};

//Adding Subscription Details to Child
export const addSubscriptionToChildren = userData => dispatch => {
  dispatch({
    type: ADD_CHILDREN,
    payload: userData
  });
};

//Adding Child to Parent's Profile
export const addChildrenToProfile = (userData, history) => dispatch => {
  axios
    .post('/api/auth/addChildrenToProfile', userData)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
