import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import { getQuestions } from '../../actions/profileAction';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      testPaper: [],
      questions: [],
      answers: [],
      timeout: '',
      currentQuestionIndex: 0,
      minutes: 0,
      seconds: 0,
      errors: {}
    };

    this.onNextQuestion = this.onNextQuestion.bind(this);
    this.handler = this.handler.bind(this);
  }

  onNextQuestion(e) {
    this.setState({
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
      minutes: 0,
      seconds: 0
    });
  }

  handler(e) {
    this.setState({ seconds: this.state.seconds + 1 });
    if (this.state.seconds === 60) {
      this.setState({ seconds: 0 });
      this.setState({ minutes: this.state.minutes + 1 });
      if (this.state.minutes === 60) this.setState({ minutes: 0 });
    }

    if (
      document.getElementById('demo') !== null &&
      document.getElementById('demo') !== undefined
    ) {
      document.getElementById('demo').innerHTML =
        (this.state.minutes < 10
          ? '0' + this.state.minutes
          : this.state.minutes) +
        ':' +
        (this.state.seconds < 10
          ? '0' + this.state.seconds
          : this.state.seconds);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getQuestions();

    var date = new Date();
    // var sec = date.getSeconds();
    var sec = this.state.seconds;
    // var min = date.getMinutes();
    var min = this.state.minutes;

    setInterval(this.handler, 1000);
    this.handler();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      testPaper:
        nextProps.profile.questions[atob(this.props.match.params.childClass)][
          atob(this.props.match.params.selectedSubject)
        ][atob(this.props.match.params.index)],
      questions:
        nextProps.profile.questions[atob(this.props.match.params.childClass)][
          atob(this.props.match.params.selectedSubject)
        ][atob(this.props.match.params.index)]['Question'],
      answers:
        nextProps.profile.questions[atob(this.props.match.params.childClass)][
          atob(this.props.match.params.selectedSubject)
        ][atob(this.props.match.params.index)]['Answer']
    });
  }

  render() {
    let QuestionRow = [];
    let { currentQuestionIndex } = this.state;
    let currentQuestion = [];
    let currentAnswer = [];
    if (this.state.testPaper['Question'] !== undefined) {
      const Questionlength = this.state.testPaper['Question'].length;

      for (var index = 1; index <= Questionlength; index++) {
        if (index > 9) {
          if (index === currentQuestionIndex + 1) {
            QuestionRow.push(
              <div className="circle5 current" key={index}>
                <div className="circle5-text-doubleDigit">{index}</div>
              </div>
            );
          } else {
            QuestionRow.push(
              <div className="circle5" key={index}>
                <div className="circle5-text-doubleDigit">{index}</div>
              </div>
            );
          }
        } else {
          if (index === currentQuestionIndex + 1) {
            QuestionRow.push(
              <div className="circle5 current" key={index}>
                <div className="circle5-text">{index}</div>
              </div>
            );
          } else {
            QuestionRow.push(
              <div className="circle5" key={index}>
                <div className="circle5-text">{index}</div>
              </div>
            );
          }
        }
      }

      const seperateTextAndImage = this.state.questions[
        currentQuestionIndex
      ].split(',');
      seperateTextAndImage.forEach(text_img => {
        if (text_img.includes('png')) {
          currentQuestion.push(
            <img src={'https://www.exceltestzone.com.au' + text_img} />
          );
        } else {
          currentQuestion.push(
            <p className="black-text margin-2pertop-bot">{text_img}</p>
          );
        }
      });

      const options = this.state.answers[currentQuestionIndex].split(',');
      let answer_img_html = [];
      options.forEach(text_img => {
        if (text_img.includes('png')) {
          currentAnswer.push(
            <React.Fragment>
              <div className="col l10 m9 s8 options__text">
                <img src={'https://www.exceltestzone.com.au' + text_img} />
              </div>
              <div className="col l2 m3 s4 right-align options__option">
                <p>
                  <label>
                    <input name="group1" type="radio" />
                    <span />
                  </label>
                </p>
              </div>
            </React.Fragment>
          );
        } else {
          currentAnswer.push(
            <React.Fragment>
              <div className="col l10 m9 s8 options__text">{text_img}</div>
              <div className="col l2 m3 s4 right-align options__option">
                <p>
                  <label>
                    <input name="group1" type="radio" />
                    <span />
                  </label>
                </p>
              </div>
            </React.Fragment>
          );
        }
      });
    }

    return (
      <React.Fragment>
        <Navbar class="" />
        <section className="question">
          <div className="row">
            <div className="col l12 m12 s12 center-align white black-text">
              <h3 className="question__heading">Situational Judgmnet Test</h3>
              <div className="question__heading-number">
                <i className="material-icons question__heading-icon">
                  arrow_back
                </i>
                {this.state.testPaper !== undefined ? QuestionRow : ''}
                <i className="material-icons question__heading-icon">
                  arrow_forward
                </i>
              </div>
              <div className="divider margin-2per" />
            </div>
          </div>
        </section>
        <section className="questionDashboard">
          <div className="row">
            <div className="col l6 m6 s12 grey lighten-4">
              <h2 className="questionDashboard__question">
                Question {currentQuestionIndex + 1}
              </h2>
              <p className="questionDashboard__question-text">
                {currentQuestion}
              </p>
              <div className="row margin-10per">
                <div className="col l3 m3 s4 right-align">
                  <div>
                    <i className="material-icons blue-text timer-icon">timer</i>
                  </div>
                </div>
                <div className="col l9 m9 s8 moveup-2per left-align">
                  <span className="end-test1" id="demo" />
                  <a className="end-test">End test</a>
                </div>
              </div>
            </div>
            <div className="col l6 m6 s12">
              <div className="row">
                <div className="col l12 m12 s12 questionDashboard__options">
                  <div className="col l10 m9 s8 center-align">
                    <h5 className="questionDashboard__answer">Options</h5>
                  </div>
                  <div className="col l2 m3 s4 right-align">
                    <h5 className="questionDashboard__answer">Answer</h5>
                  </div>
                  <div className="options center-align">{currentAnswer}</div>
                  <div className="row">
                    <div className="col l12 s12 m12 right-align">
                      <a
                        className="btn blue lighten-1 options__submit"
                        onClick={this.onNextQuestion}
                      >
                        Next question
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { getQuestions })(withRouter(Question));
