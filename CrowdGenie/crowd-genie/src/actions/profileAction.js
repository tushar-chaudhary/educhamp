import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  GET_CURRENT_USER,
  GET_ERRORS,
  GET_QUESTIONS,
  GET_PROFILE
} from './types';

export const getQuestions = () => dispatch => {
  axios
    .get('/api/question/questions')
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data.questions
      })
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getProfile = userData => dispatch => {
  axios
    .post('/api/profile/getProfile', userData)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
