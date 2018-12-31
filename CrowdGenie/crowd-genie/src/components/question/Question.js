import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import { getQuestions } from '../../actions/profileAction';

class Question extends Component {
  //State names
  constructor() {
    super();
    this.state = {
      testPaper: [],
      questions: [],
      answers: [],
      tags: [],
      correctanswers: [],
      timeout: '',
      remainingQuestions: [],
      answeredQuestions: [],
      lefttime: 0,
      currentQuestionIndex: 0,
      minutes: 0,
      seconds: 0,
      currentQuestionminutes: 0,
      currentQuestionseconds: 0,
      errors: {}
    };

    // function declaration and binding them
    this.onNextQuestion = this.onNextQuestion.bind(this);
    this.handler = this.handler.bind(this);
    this.handlercurent = this.handlercurent.bind(this);
  }

  //To move to nex Question
  onNextQuestion(e) {
    document.getElementsByName('correctanswer').forEach(checked => {
      if (checked.checked) {
        // storing in localstorage the answers that are submitted
        var oldItems = JSON.parse(localStorage.getItem('test')) || [];

        const dict = {};
        //encrypting the answer and correct answer
        dict[this.state.currentQuestionIndex + 1] = checked.value;
        dict['correctAnswer'] = this.state.correctanswers[
          this.state.currentQuestionIndex
        ];
        dict['QuestionPaperName'] = this.state.testPaper['Title'];
        dict['tag'] = this.state.tags[this.state.currentQuestionIndex];
        dict['time'] =
          this.state.currentQuestionminutes +
          'm' +
          ' ' +
          this.state.currentQuestionseconds +
          's';
        oldItems.push(dict);
        localStorage.setItem('test', JSON.stringify(oldItems));

        document.getElementsByName('correctanswer').forEach(checked => {
          if (checked.checked) {
            checked.checked = false;
          }
        });

        if (oldItems.length === this.state.questions.length) {
          this.props.history.push('/testreport');
        } else {
          this.setState({
            answeredQuestions: [
              ...this.state.answeredQuestions,
              this.state.currentQuestionIndex + 1 + ', '
            ],
            currentQuestionIndex: this.state.currentQuestionIndex + 1,
            currentQuestionseconds: 0,
            currentQuestionminutes: 0
          });

          // move to top of the screen
          window.scrollTo(0, 200);
        }
      }
    });
  }

  //Timer for the test
  handler(e) {
    this.setState({ seconds: this.state.seconds + 1 });
    if (this.state.seconds === 60) {
      this.setState({ seconds: 0 });
      this.setState({ minutes: this.state.minutes + 1 });
      if (this.state.minutes === 60) this.setState({ minutes: 0 });
    }

    if (
      document.getElementById('time') !== null &&
      document.getElementById('time') !== undefined
    ) {
      document.getElementById('time').innerHTML =
        (this.state.minutes < 10
          ? '0' + this.state.minutes
          : this.state.minutes) +
        'm ' +
        (this.state.seconds < 10
          ? '0' + this.state.seconds
          : this.state.seconds) +
        's ';
    }
  }

  //Timer for the per question
  handlercurent(e) {
    this.setState({
      currentQuestionseconds: this.state.currentQuestionseconds + 1
    });
    if (this.state.currentQuestionseconds === 60) {
      this.setState({ currentQuestionseconds: 0 });
      this.setState({
        currentQuestionminutes: this.state.currentQuestionminutes + 1
      });
      if (this.state.currentQuestionminutes === 60)
        this.setState({ currentQuestionminutes: 0 });
    }

    if (
      document.getElementById('currentTime') !== null &&
      document.getElementById('currentTime') !== undefined
    ) {
      document.getElementById('currentTime').innerHTML =
        (this.state.currentQuestionminutes < 10
          ? '0' + this.state.currentQuestionminutes
          : this.state.currentQuestionminutes) +
        ':' +
        (this.state.currentQuestionseconds < 10
          ? '0' + this.state.currentQuestionseconds
          : this.state.currentQuestionseconds);
    }
  }

  // loaded first when the page is loaded
  componentDidMount() {
    //moving to top
    window.scrollTo(0, 0);
    //getting questions
    this.props.getQuestions();

    //clear the localStorage
    if (localStorage.getItem('test') !== null) {
      localStorage.removeItem('test');
    }

    //calling timers at the interval of 1 second
    setInterval(this.handler, 1000);
    this.handler();
    setInterval(this.handlercurent, 1000);
    this.handlercurent();
  }

  //Using when the props get updated with new values
  componentWillReceiveProps(nextProps) {
    //getting url values from the url and decoding them and getting questions
    const Questions =
      nextProps.profile.questions[atob(this.props.match.params.childClass)][
        atob(this.props.match.params.selectedSubject)
      ][atob(this.props.match.params.index)]['Question'];

    //getting url values from the url and decoding them  and getting whole subject paper along with question and answers
    const testPaper =
      nextProps.profile.questions[atob(this.props.match.params.childClass)][
        atob(this.props.match.params.selectedSubject)
      ][atob(this.props.match.params.index)];

    const correctAnswer =
      nextProps.profile.questions[atob(this.props.match.params.childClass)][
        atob(this.props.match.params.selectedSubject)
      ][atob(this.props.match.params.index)]['correctAnswer'];

    // setting the state with questions, answers and options
    this.setState({
      testPaper: testPaper,
      questions: testPaper['Question'],
      answers: testPaper['Answer'],
      tags: testPaper['Tags'],
      correctanswers: correctAnswer
    });

    // appending all the question indexes for showing all the question indexes
    const QuestionRow = [];
    for (var index = 1; index <= Questions.length; index++) {
      if (index === Questions.length) {
        QuestionRow.push(index);
      } else {
        QuestionRow.push(index + ', ');
      }
    }

    //setting total questions and the the total time for the whole question paper
    this.setState({
      remainingQuestions: QuestionRow,
      lefttime: testPaper['Timing'].replace(' mins', '')
    });
  }

  render() {
    let QuestionRow = [];
    let { currentQuestionIndex } = this.state;
    let currentQuestion = [];
    let currentAnswer = [];

    //checking if the question paper has loaded or not and waiting till it is loaded
    if (this.state.testPaper['Question'] !== undefined) {
      //Checking if time is over
      if (this.state.lefttime !== '' && this.state.lefttime === 0) {
        this.props.history.push('/testreport');
      }

      const seperateTextAndImage = this.state.questions[
        currentQuestionIndex
      ].split(',');
      seperateTextAndImage.forEach((text_img, index) => {
        //checking if the question contains images if it contains images then show it with img tag
        if (text_img.includes('png')) {
          currentQuestion.push(
            <img
              src={'https://www.exceltestzone.com.au' + text_img}
              key={index}
            />
          );
        } else {
          // else showing with text tags
          currentQuestion.push(
            <React.Fragment key={index}>
              <h5 className="mathemafix__testquestion1">{text_img}</h5>
            </React.Fragment>
          );
        }
      });

      // for showing answer options
      const options = this.state.answers[currentQuestionIndex].split(',');
      let answer_img_html = [];
      options.forEach((text_img, index) => {
        //checking if the question contains images if it contains images then show it with img tag
        if (text_img.includes('png')) {
          currentAnswer.push(
            <div className="col l3 m6 s12" key={index}>
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="correctanswer"
                    value={index + 1}
                    type="radio"
                  />
                  <span className="radio-size">
                    <img src={'https://www.exceltestzone.com.au' + text_img} />
                  </span>
                </label>
              </p>
            </div>
          );
        } else {
          // else showing with text tags
          currentAnswer.push(
            <div className="col l3 m6 s12" key={index}>
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="correctanswer"
                    value={index + 1}
                    type="radio"
                  />
                  <span className="radio-size">{text_img}</span>
                </label>
              </p>
            </div>
          );
        }
      });
    }

    return (
      <React.Fragment>
        <Navbar class="" />
        <section className="mathemafix">
          <div className="row card-panel hoverable mathemafix__card">
            <h5 className="mathemafix__testname">
              Test name: &nbsp;{this.state.testPaper['Title']}
            </h5>
            <h5 className="mathemafix__testtime">
              Question:{' '}
              <span className="mathemafix__testtime-text">
                {this.state.testPaper['Question'] !== undefined
                  ? this.state.testPaper['Question'].length
                  : ''}
              </span>, Time: allowed{' '}
              <span className="mathemafix__testtime-text">
                {this.state.testPaper !== undefined
                  ? this.state.testPaper['Timing']
                  : ''}
              </span>, spent so far{' '}
              <span className="mathemafix__testtime-text" id="time" />, left{' '}
              <span className="mathemafix__testtime-text">
                {this.state.lefttime - this.state.minutes}m
              </span>, spent{' '}
              <span className="mathemafix__testtime-text">
                on this question
              </span>{' '}
              <span className="mathemafix__testtime-text" id="currentTime">
                49:12
              </span>
            </h5>
            <div className="row mathemafix-question">
              <div className="col l12 s12 m12">
                <h5 className="mathemafix__testquestion">
                  Question {currentQuestionIndex + 1}
                </h5>
                {currentQuestion}
              </div>
            </div>
            <div className="row">
              <div className="col l12 m12 s12">
                <h5 className="mathemafix__testanswer">Your answer :</h5>
                {currentAnswer}
                <div className="margin-5per">
                  <a
                    className="popup__login btn  left edit"
                    onClick={this.onNextQuestion}
                  >
                    Continue
                  </a>
                </div>
              </div>
            </div>
            <div className="divider" />
            <h5 className="mathemafix__testremaining">
              Remained question:{' '}
              <span className="mathemafix__testtime-text">
                {this.state.remainingQuestions.filter(
                  x => !this.state.answeredQuestions.includes(x)
                )}
              </span>
            </h5>
            <h5 className="mathemafix__testremaining">
              Answered question:{' '}
              <span className="mathemafix__testtime-text">
                {this.state.answeredQuestions}
              </span>
            </h5>
            <h5 className="mathemafix__testremaining">
              Run rates:{' '}
              <span className="mathemafix__testtime-text">
                {this.state.answeredQuestions.length} completed,{' '}
                {this.state.remainingQuestions.length -
                  this.state.answeredQuestions.length}{' '}
                remaining, average run{' '}
                {parseInt(this.state.seconds) > 0 &&
                this.state.answeredQuestions.length > 0
                  ? parseFloat(
                      this.state.seconds /
                        60 /
                        this.state.answeredQuestions.length
                    ).toFixed(3)
                  : '00'}min/question
              </span>
            </h5>
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
