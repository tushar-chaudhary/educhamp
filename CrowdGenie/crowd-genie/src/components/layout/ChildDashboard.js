import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getQuestions } from '../../actions/profileAction';
import { getTestReport, getTestReportByTitle } from '../../actions/testActions';
import M from 'materialize-css';

class ChildDashboard extends Component {
  constructor() {
    super();
    this.state = {
      testPaper: [],
      allSubjects: [],
      selectedSubject: '',
      errors: {}
    };
  }

  onSubmit(e, childClass, selectedSubject, testType, index) {
    if (testType !== 'Free Test' && this.props.user.subscriptionYear === '') {
      M.toast({
        html: '<h5>Please buy subscription to continue</h5>'
      });
    } else {
      this.props.history.push(
        '/question/' +
          btoa(childClass) +
          '/' +
          btoa(selectedSubject) +
          '/' +
          btoa(testType) +
          '/' +
          btoa(index)
      );
    }
  }

  onViewReport(e, localstorage) {
    localStorage.setItem('test', localstorage);
    this.props.history.push('/viewreport');
  }

  onfilter(e, subjectName) {
    this.setState({
      selectedSubject: subjectName
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left
      stopPropagation: false // Stops event propagation
    });

    this.props.getQuestions();
    this.props.getTestReport({
      user:
        this.props.user._id === undefined
          ? this.props.user.id
          : this.props.user._id
    });

    // this.props.getTestReportByTitle({ class: this.props.user.schoolYear });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allSubjects: Object.keys(
        nextProps.profile.questions[this.props.user.schoolYear]
      ),
      testPaper: nextProps.profile.questions[this.props.user.schoolYear],
      selectedSubject: Object.keys(
        nextProps.profile.questions[this.props.user.schoolYear]
      )[0]
    });
  }
  render() {
    const { user } = this.props;
    const { results } = this.props;
    let availableSubjects = [];
    let { testPaper } = this.state;
    let testCollection = [];
    if (testPaper) {
      this.state.allSubjects.forEach((subject, index) => {
        availableSubjects.push(
          <li key={index}>
            <a name={subject} onClick={e => this.onfilter(e, e.target.name)}>
              {subject.toUpperCase()}
            </a>
          </li>
        );

        if (this.state.selectedSubject !== '') {
          testCollection.length = 0;
          testPaper[this.state.selectedSubject].forEach((test, index) => {
            if (Object.keys(results).length !== 0) {
              if (Object.keys(results.test_report).length !== 0) {
                if (
                  results.test_report.find(o => o.testName === test['Title'])
                ) {
                  testCollection.push(
                    <React.Fragment key={index}>
                      <div className="col l12 s12 m12 totalAssessment__row border-button">
                        <div className="col l1 m1">
                          <img src="images/notebook.svg" className="notebook" />
                        </div>
                        <div className="col l2 m2 s12 totalAssessment__text">
                          {test['Title']}
                        </div>
                        <div className="col l1 m1 s12 totalAssessment__text">
                          {test['Timing']}
                        </div>
                        <div className="col l1 m2 s12 totalAssessment__text center-align">
                          {results.test_report
                            .find(o => o.testName === test['Title'])
                            .date.substring(0, 10)}
                        </div>
                        <div className="col l2 m2 s12 totalAssessment__text center-align">
                          {index === 0 || index === 1
                            ? 'Free Test'
                            : 'Paid Test'}
                        </div>
                        <div className="col l2 m2 s12 totalAssessment__text">
                          <div className="col l6 m6 s12">
                            <div className="circle4">
                              {test['Question'].length}
                            </div>
                          </div>
                        </div>
                        <div className="col l1 m2 s12 totalAssessment__text center-align">
                          {
                            results.test_report.find(
                              o => o.testName === test['Title']
                            ).score
                          }{' '}
                          %
                        </div>
                        <div className="col l2 m2 s12 totalAssessment__text center-align">
                          <a
                            className="btn edit2"
                            onClick={e =>
                              this.onViewReport(
                                e,

                                results.test_report.find(
                                  o => o.testName === test['Title']
                                ).report
                              )}
                          >
                            View report
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                } else {
                  testCollection.push(
                    <React.Fragment key={index}>
                      <div className="col l12 s12 m12 totalAssessment__row border-button">
                        <div className="col l1 m1">
                          <img src="images/notebook.svg" className="notebook" />
                        </div>
                        <div className="col l2 m2 s12 totalAssessment__text">
                          {test['Title']}
                        </div>
                        <div className="col l1 m1 s12 totalAssessment__text">
                          {test['Timing']}
                        </div>
                        <div className="col l1 m2 s12 totalAssessment__text center-align" />
                        <div className="col l2 m2 s12 totalAssessment__text center-align">
                          {index === 0 || index === 1
                            ? 'Free Test'
                            : 'Paid Test'}
                        </div>
                        <div className="col l2 m2 s12 totalAssessment__text">
                          <div className="col l6 m6 s12">
                            <div className="circle4">
                              {test['Question'].length}
                            </div>
                          </div>
                        </div>
                        <div className="col l1 m2 s12 totalAssessment__text center-align">
                          -
                        </div>
                        <div className="col l2 m2 s12 totalAssessment__text center-align">
                          <a
                            className="btn edit2"
                            onClick={e =>
                              this.onSubmit(
                                e,
                                user.schoolYear,
                                this.state.selectedSubject,
                                index === 0 || index === 1
                                  ? 'Free Test'
                                  : 'Paid Test',
                                index
                              )}
                          >
                            Take it
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }
              } else {
                testCollection.push(
                  <React.Fragment key={index}>
                    <div className="col l12 s12 m12 totalAssessment__row border-button">
                      <div className="col l1 m1">
                        <img src="images/notebook.svg" className="notebook" />
                      </div>
                      <div className="col l2 m2 s12 totalAssessment__text">
                        {test['Title']}
                      </div>
                      <div className="col l1 m1 s12 totalAssessment__text">
                        {test['Timing']}
                      </div>
                      <div className="col l1 m2 s12 totalAssessment__text center-align" />
                      <div className="col l2 m2 s12 totalAssessment__text center-align">
                        {index === 0 || index === 1 ? 'Free Test' : 'Paid Test'}
                      </div>
                      <div className="col l2 m2 s12 totalAssessment__text">
                        <div className="col l6 m6 s12">
                          <div className="circle4">
                            {test['Question'].length}
                          </div>
                        </div>
                      </div>
                      <div className="col l1 m2 s12 totalAssessment__text center-align">
                        -
                      </div>
                      <div className="col l2 m2 s12 totalAssessment__text center-align">
                        <a
                          className="btn edit2"
                          onClick={e =>
                            this.onSubmit(
                              e,
                              user.schoolYear,
                              this.state.selectedSubject,
                              index === 0 || index === 1
                                ? 'Free Test'
                                : 'Paid Test',
                              index
                            )}
                        >
                          Take it
                        </a>
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
            }
          });
        }
      });
    }

    return (
      <React.Fragment>
        <Navbar class="" />
        <section className="childDashboard grey lighten-5">
          <div className="row childDashboard__assessments">
            <div className="commentbox-app">
              <div className="container">
                <h1 className="heading">
                  Hey {user.username}, you were last working on...
                </h1>
              </div>
            </div>
            <div className="col l4 m4 s12">
              <div className="childDashboard__card childDashboard__card1">
                <h3 className="childDashboard__card-title">Crunch Basics</h3>
                <p className="childDashboard__card-content">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classnameical Latin
                  literature from 45 BC, making it over 2000 years old.
                </p>
                <div className="divider padd" />
                <div className="row">
                  <div className="container">
                    <div className="col l6 m6 s12">
                      <div className="circle1">5</div>
                      <h5 className="circle1-text">Answered</h5>
                    </div>
                    <div className="col l6 m6 s12">
                      <div className="circle2">5</div>
                      <h5 className="circle2-text">Assessments</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col l4 m4 s12">
              <div className="childDashboard__card childDashboard__card2">
                <h3 className="childDashboard__card-title">Crash Course</h3>
                <p className="childDashboard__card-content">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classnameical Latin
                  literature from 45 BC, making it over 2000 years old.
                </p>
                <div className="divider padd" />
                <div className="row">
                  <div className="container">
                    <div className="col l6 m6 s12">
                      <div className="circle1">5</div>
                      <h5 className="circle1-text">Answered</h5>
                    </div>
                    <div className="col l6 m6 s12">
                      <div className="circle2">5</div>
                      <h5 className="circle2-text">Assessments</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col l4 m4 s12">
              <div className="childDashboard__card childDashboard__card3">
                <h3 className="childDashboard__card-title">
                  c5-unit-hash-functions
                </h3>
                <p className="childDashboard__card-content">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classnameical Latin
                  literature from 45 BC, making it over 2000 years old.
                </p>
                <div className="divider padd" />
                <div className="row">
                  <div className="container">
                    <div className="col l6 m6 s12">
                      <div className="circle1">5</div>
                      <h5 className="circle1-text">Answered</h5>
                    </div>
                    <div className="col l6 m6 s12">
                      <div className="circle2">5</div>
                      <h5 className="circle2-text">Assessments</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="selectSubject">
          <div className="row">
            <div className="col l12 m12 s12">
              <h4 className="selectSubject__heading">
                Year {this.props.user.schoolYear} Selective Schools &
                Scholarship-style Tests Subscription Test List{' '}
                <a
                  className="dropdown-trigger btn selectSubject__dropDown white"
                  href="#"
                  data-target="dropdown1"
                >
                  <i className="material-icons">subject</i>
                  {this.state.selectedSubject}
                </a>
              </h4>
              <ul id="dropdown1" className="dropdown-content">
                {availableSubjects}
              </ul>
            </div>
          </div>
        </section>

        <section className="totalAssessment">
          <div className="row">
            <div className="col l12 s12 m12 totalAssessment__row">
              <div className="col l1 m1" />
              <div className="col l2 m2 s12 totalAssessment__heading">Name</div>
              <div className="col l1 m1 s12 totalAssessment__heading">Time</div>
              <div className="col l1 m2 s12 totalAssessment__heading center-align">
                Completed date
              </div>
              <div className="col l2 m2 s12 totalAssessment__heading center-align">
                Test type
              </div>
              <div className="col l2 m2 s12 totalAssessment__heading">
                Assessment
              </div>
              <div className="col l1 m2 s12 totalAssessment__heading center-align">
                % marks
              </div>
              <div className="col l2 m2 s12 totalAssessment__heading center-align">
                Option
              </div>
            </div>
            {testCollection}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  profile: state.profile,
  results: state.results,
  errors: state.errors
});

export default connect(mapStateToProps, {
  getQuestions,
  getTestReport,
  getTestReportByTitle
})(withRouter(ChildDashboard));
