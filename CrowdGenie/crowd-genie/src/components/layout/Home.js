import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactChartkick, { LineChart, PieChart, BarChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profile: '',
      totalMarks: 0,
      gotMarks: 0,
      errors: {}
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    JSON.parse(localStorage.getItem('answered') || '[]').forEach(ans => {
      this.state.totalMarks += parseInt(ans.marks);
      if (ans.correct === true) {
        this.state.gotMarks += parseInt(ans.marks);
      }
    });
    this.setState({
      totalMarks: this.state.totalMarks,
      gotMarks: this.state.gotMarks
    });
  }

  render() {
    let answered = JSON.parse(localStorage.getItem('answered') || '[]');
    const len = answered.length;
    let correct = 0;
    let wrong = 0;
    let uniqueTagArray = [];
    let uniqueTag = [];
    let uniqueTagCorrect = [];
    let finalTagArray = [];

    answered.forEach(ans => {
      if (ans.correct === true) {
        correct += 1;
      } else if (ans.correct === false) {
        wrong += 1;
      }
    });

    answered.forEach(ans => {
      ans.tags.forEach(tag => {
        uniqueTagArray.push({ tag: tag, correct: ans.correct });
        uniqueTag.push(tag);
      });
    });

    uniqueTag = uniqueTag.filter(function(item, pos) {
      return uniqueTag.indexOf(item) == pos;
    });

    uniqueTag.forEach(tag => {
      uniqueTagArray.forEach(obj => {
        if (obj.tag === tag) {
          uniqueTagCorrect.push({ tag: tag, correct: obj.correct });
        }
      });
    });

    uniqueTag.forEach(tag => {
      let count = 0;
      let success = 0;
      uniqueTagCorrect.forEach(arr => {
        if (arr.tag === tag) {
          count = count + 1;
          if (arr.correct === true) {
            success = success + 1;
          }
        }
      });
      if (success / count < 0.5 === true) {
        finalTagArray.push({
          tag: tag,
          count: count,
          success: success,
          workhard: 'YES'
        });
      } else {
        finalTagArray.push({
          tag: tag,
          count: count,
          success: success,
          workhard: 'NO'
        });
      }
    });

    const table = finalTagArray.map((item, i) => {
      return (
        <tr>
          <td>{item.tag}</td>
          <td>{item.count}</td>
          <td>{item.success}</td>
          <td>{item.workhard}</td>
        </tr>
      );
    });

    return (
      <div>
        <div>
          <section className="section section-login">
            <div className="row">
              <div
                className="col l12 m12 s12"
                style={{
                  backgroundImage: "url('images/task.gif')",
                  paddingBottom: '2%',
                  backgroundPosition: '-30px',
                  backgroundSize: '100% 200%',
                  height: '300px'
                }}
              />
            </div>
            <div className="row">
              <div className="col l6 m6 s12">
                <PieChart
                  data={[
                    ['Total Questions', len],
                    ['Correct', correct],
                    ['Wrong', wrong]
                  ]}
                  height="420px"
                />
              </div>
              <div className="col l6 m6 s12" style={{ marginTop: '5%' }}>
                <BarChart
                  data={[
                    ['Total Marks', this.state.totalMarks],
                    ['Scored', this.state.gotMarks]
                  ]}
                />
              </div>
            </div>
            <div className="row">
              <div className="col l6 m6 s12">
                <div className="row">
                  <div
                    className="col s12 m12 l12 card"
                    style={{
                      paddingLeft: '0',
                      borderRadius: '1%',
                      paddingTop: '1%',
                      paddingBottom: '2%'
                    }}
                  >
                    <div className="card-content">
                      <div className="col l4 s6 m6">
                        <div className="box1" />
                      </div>
                      <div className="col l6 s6 m6">
                        <h5>Total correct answers: {correct}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col s12 m12 l12 card"
                    style={{
                      paddingLeft: '0',
                      borderRadius: '1%',
                      paddingTop: '1%',
                      paddingBottom: '2%'
                    }}
                  >
                    <div className="card-content">
                      <div className="col l4 s6 m6">
                        <div className="box3" />
                      </div>
                      <div className="col l6 s6 m6">
                        <h5>Total wrong answers: {wrong}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col s12 m12 l12 card"
                    style={{
                      paddingLeft: '0',
                      borderRadius: '1%',
                      paddingTop: '1%',
                      paddingBottom: '2%'
                    }}
                  >
                    <div className="card-content">
                      <div className="col l4 s6 m6">
                        <div className="box2" />
                      </div>
                      <div className="col l6 s6 m6">
                        <h5>Total questions: {len}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col l6 m6 s12">
                <table className="centered">
                  <thead>
                    <tr>
                      <th>Tag</th>
                      <th>Count</th>
                      <th>Correct</th>
                      <th>Work Hard</th>
                    </tr>
                  </thead>
                  <tbody>{table}</tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, {})(Home);
