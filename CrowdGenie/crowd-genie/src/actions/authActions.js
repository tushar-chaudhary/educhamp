import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_SUBSCRIPTION,
  ADD_CHILDREN,
  LOGOUT,
  LOGOUT_ADDCHILDREN,
  LOGOUT_PROFILE,
  RESET_PASSWORD,
  LOGIN_CHILD,
  EDIT_PARENT_PROFILE,
  EDIT_PARENT_PASSWORD,
  EDIT_CHILD_PROFILE,
  EDIT_CHILD_PASSWORD,
  SKIP_SUBSCRIPTION
} from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/auth/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/auth/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateUserSubscription = userData => dispatch => {
  dispatch({
    type: SET_SUBSCRIPTION,
    payload: userData
  });
};

//Updating the subscription status for the parent and first child
export const updateUserSubscription_Set = (userData, history) => dispatch => {
  axios
    .post('/api/auth/updateSubscription_Set', userData)
    .then(res => {
      dispatch({
        type: SET_SUBSCRIPTION,
        payload: res.data
      });
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// removing logged in user
export const removeCurrentUser = decoded => {
  return {
    type: LOGOUT,
    payload: decoded
  };
};

// removing Profile of loggedin user
export const removeProfile = decoded => {
  return {
    type: LOGOUT_PROFILE,
    payload: decoded
  };
};

// removing Subscription details of current user
export const removeChildrenSubscription = decoded => {
  return {
    type: LOGOUT_ADDCHILDREN,
    payload: decoded
  };
};

export const setCurrentGoogleUser = decoded => dispatch => {
  return dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });
};

// Log user out
export const logoutUser = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  history.push('/login');
  // Set current user to {} which will set isAuthenticated to false
  dispatch(removeCurrentUser({}));
  dispatch(removeChildrenSubscription({}));
  dispatch(removeProfile({}));
};

//Reset Password
export const resetPassword = (userData, history) => dispatch => {
  axios
    .post('/api/auth/resetPassword', userData)
    .then(res => {
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data
      });
      history.push('/login');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login Child
export const loginChild = (userData, history) => dispatch => {
  axios
    .post('/api/auth/resetPassword', userData)
    .then(res => {
      dispatch({
        type: LOGIN_CHILD,
        payload: res.data
      });
      history.push('/childDashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login Child
export const loginChildForEdit = (userData, history) => dispatch => {
  axios
    .post('/api/auth/resetPassword', userData)
    .then(res => {
      dispatch({
        type: LOGIN_CHILD,
        payload: res.data
      });
      history.push('/editChild');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editParentProfile = (userData, history) => dispatch => {
  axios
    .post('/api/auth/editParentProfile', userData)
    .then(res => {
      dispatch({
        type: EDIT_PARENT_PROFILE,
        payload: res.data
      });
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editChildProfile = (userData, history) => dispatch => {
  axios
    .post('/api/auth/editChildProfile', userData)
    .then(res => {
      dispatch({
        type: EDIT_CHILD_PROFILE,
        payload: res.data
      });
      history.push('/childDashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editParentPassword = userData => dispatch => {
  axios
    .post('/api/auth/editParentPassword', userData)
    .then(res => {
      dispatch({
        type: EDIT_PARENT_PASSWORD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editChildPassword = (userData, history) => dispatch => {
  axios
    .post('/api/auth/editChildPassword', userData)
    .then(res => {
      dispatch({
        type: EDIT_CHILD_PASSWORD,
        payload: res.data
      });
      history.push('/childDashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const skipSubscription = (userData, history) => dispatch => {
  axios
    .post('/api/auth/skipSubscription', userData)
    .then(res => {
      dispatch({
        type: SKIP_SUBSCRIPTION,
        payload: res.data
      });
      history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
