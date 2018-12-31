import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';

class Testreport extends Component {
  constructor() {
    super();
    this.state = {
      localstorage: [],
      today: ''
    };
  }
  // loaded first when the page is loaded
  componentDidMount() {
    //moving to top
    window.scrollTo(0, 0);

    //Setting current day time weekday
    var objToday = new Date(),
      weekday = new Array(
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ),
      dayOfWeek = weekday[objToday.getDay()],
      domEnder = (function() {
        var a = objToday;
        if (/1/.test(parseInt((a + '').charAt(0)))) return 'th';
        a = parseInt((a + '').charAt(1));
        return 1 == a ? 'st' : 2 == a ? 'nd' : 3 == a ? 'rd' : 'th';
      })(),
      dayOfMonth =
        today + (objToday.getDate() < 10)
          ? '0' + objToday.getDate() + domEnder
          : objToday.getDate() + domEnder,
      months = new Array(
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ),
      curMonth = months[objToday.getMonth()],
      curYear = objToday.getFullYear(),
      curHour =
        objToday.getHours() > 12
          ? objToday.getHours() - 12
          : objToday.getHours() < 10
            ? '0' + objToday.getHours()
            : objToday.getHours(),
      curMinute =
        objToday.getMinutes() < 10
          ? '0' + objToday.getMinutes()
          : objToday.getMinutes(),
      curSeconds =
        objToday.getSeconds() < 10
          ? '0' + objToday.getSeconds()
          : objToday.getSeconds(),
      curMeridiem = objToday.getHours() > 12 ? 'PM' : 'AM';
    var today =
      curHour +
      ':' +
      curMinute +
      '.' +
      curSeconds +
      curMeridiem +
      ' ' +
      dayOfWeek +
      ' ' +
      dayOfMonth +
      ' of ' +
      curMonth +
      ', ' +
      curYear;

    //loading results
    this.setState({
      localstorage: JSON.parse(localStorage.getItem('test')) || [],
      today: today
    });
  }
  render() {
    const { localstorage } = this.state;
    let testname = '';
    let testresult = '';
    let timeoncurrenanswers = 0;
    let testStatistics = [];
    let timeonwronganswers = 0;
    let correctanswer = 0;
    let wronganswer = 0;
    let uniq = {}; // contains all the unique names
    if (localstorage[0] !== undefined) {
      testname = localstorage[0]['QuestionPaperName'];
      testresult = localstorage.map((eachquestionresult, index) => {
        let time = eachquestionresult['time'].split('m ');
        if (
          eachquestionresult[index + 1] === eachquestionresult['correctAnswer']
        ) {
          timeoncurrenanswers += parseInt(time[0]) * 60 + parseInt(time[1]);
          correctanswer += 1;
          let el = eachquestionresult['tag'];
          if (!uniq[el]) uniq[el] = []; // start the array
          uniq[el].push('correct');
        } else {
          timeonwronganswers += parseInt(time[0]) * 60 + parseInt(time[1]);
          wronganswer += 1;
          let el = eachquestionresult['tag'];
          if (!uniq[el]) uniq[el] = []; // start the array
          uniq[el].push('wrong');
        }
        return (
          <div className="col l12 m12 s12 report__row">
            <div className="col l1 m1 s1">
              <h5 className="report__header-text">{index + 1}</h5>
            </div>
            <div className="col l5 m5 s5">
              <h5 className="report__header-text">
                {eachquestionresult['tag']}
              </h5>
            </div>
            <div className="col l1 m1 s1">
              <h5 className="report__header-text">
                {eachquestionresult[index + 1]}
              </h5>
            </div>
            <div className="col l1 m1 s1">
              <h5 className="report__header-text">
                {eachquestionresult['correctAnswer']}
              </h5>
            </div>
            <div className="col l1 m1 s1">
              <h5 className="report__header-text">
                {eachquestionresult[index + 1] ===
                eachquestionresult['correctAnswer'] ? (
                  <i className="material-icons">check</i>
                ) : (
                  <i className="material-icons">close</i>
                )}
              </h5>
            </div>
            <div className="col l2 m2 s2">
              <h5 className="report__header-text">
                {eachquestionresult['time']}
              </h5>
            </div>
          </div>
        );
      });

      for (var index = 0; index < Object.keys(uniq).length; index++) {
        testStatistics.push(
          <React.Fragment>
            <h3 className="report_testStatistics-headingTag">
              {Object.keys(uniq)[index]}
            </h3>
          </React.Fragment>
        );
        testStatistics.push(
          uniq[Object.keys(uniq)[index]].map(response => {
            if (response === 'correct') {
              return (
                <React.Fragment>
                  <i className="material-icons green-text">check</i>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment>
                  <i className="material-icons red-text">close</i>
                </React.Fragment>
              );
            }
          })
        );
      }
      console.log(uniq);
    }
    return (
      <React.Fragment>
        <Navbar />
        <section className="report">
          <div className="row report__header">
            <h3 className="report__testname">{testname} result</h3>
            <div className="col l12 m12 s12 report__header">
              <div className="col l1 m1 s1">
                <h5 className="report__header-textheading">Question</h5>
              </div>
              <div className="col l5 m5 s5">
                <h5 className="report__header-textheading">Question group</h5>
              </div>
              <div className="col l1 m1 s1">
                <h5 className="report__header-textheading">Your Ans</h5>
              </div>
              <div className="col l1 m1 s1">
                <h5 className="report__header-textheading">Correct Ans</h5>
              </div>
              <div className="col l1 m1 s1">
                <h5 className="report__header-textheading">Result</h5>
              </div>
              <div className="col l2 m2 s2">
                <h5 className="report__header-textheading">Time</h5>
              </div>
            </div>
            <div className="col l12 m12 s12 report__row">
              {testresult}
              <div className="report__reports">
                <h5 className="report__header-text2">{this.state.today}</h5>
                <h5 className="report__header-text2">
                  {parseFloat(timeoncurrenanswers / 60).toFixed(2)} minutes on
                  correct and {parseFloat(timeonwronganswers / 60).toFixed(
                    2
                  )}{' '}
                  on incorrect anwers.{' '}
                  <span className="red-text">
                    {parseFloat(
                      timeonwronganswers /
                        (timeonwronganswers + timeoncurrenanswers)
                    ).toFixed(4) * 100}% of the time wasted
                  </span>
                </h5>
                <h5 className="report__header-text2">
                  Total score (marked by computer):{' '}
                  {parseFloat(
                    correctanswer / (correctanswer + wronganswer)
                  ).toFixed(4) * 100}%
                </h5>
              </div>
              <div className="report_testStatistics">
                <h3 className="report_testStatistics-heading">
                  Test Statistics
                </h3>
                {testStatistics}
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

export default connect(mapStateToProps, {})(withRouter(Testreport));
