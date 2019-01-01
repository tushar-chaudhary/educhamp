import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  TEST_REPORT_SUBMIT,
  GET_TEST_REPORT,
  GET_TEST_REPORT_BY_TITLE,
  GET_ERRORS
} from './types';

// Submitting the test report
export const testReportSubmit = (testData, history) => dispatch => {
  axios
    .post('/api/test/test_report_submit', testData)
    .then(res => {
      dispatch({
        type: TEST_REPORT_SUBMIT,
        payload: res.data.report
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

// Getting the test report by user id
export const getTestReport = testData => dispatch => {
  axios
    .post('/api/test/test_report', testData)
    .then(res => {
      dispatch({
        type: GET_TEST_REPORT,
        payload: res.data.report
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Getting the test report by test title
export const getTestReportByTitle = testData => dispatch => {
  axios
    .post('/api/test/test_report_by_title', testData)
    .then(res => {
      dispatch({
        type: GET_TEST_REPORT_BY_TITLE,
        payload: res.data.report
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
