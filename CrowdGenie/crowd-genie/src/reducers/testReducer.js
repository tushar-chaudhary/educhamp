import {
  TEST_REPORT_SUBMIT,
  GET_TEST_REPORT,
  GET_TEST_REPORT_BY_TITLE
} from '../actions/types';

const initialState = {
  test_report: {},
  all_tests: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_REPORT_SUBMIT:
      return {
        ...state,
        test_report: action.payload
      };
    case GET_TEST_REPORT:
      return {
        ...state,
        test_report: action.payload
      };
    case GET_TEST_REPORT_BY_TITLE:
      return {
        ...state,
        all_tests: action.payload
      };
    default:
      return state;
  }
}
