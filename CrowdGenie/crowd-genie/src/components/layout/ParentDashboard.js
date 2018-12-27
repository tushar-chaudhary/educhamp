import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profileAction';
import { loginChild } from '../../actions/authActions';
import { loginChildForEdit } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';

class ParentDashboard extends Component {
  constructor() {
    super();
    this.state = {
      children: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getProfile({ id: this.props.userId });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.profile.Children !== prevProps.profile.Children) {
      this.setState({
        children: this.props.profile.Children
      });
    }
  }

  onChildSubmit(e, username, password) {
    const childDetail = {
      email: this.props.user.email,
      username: username,
      password: password
    };

    this.props.loginChild(childDetail, this.props.history);
  }

  onChildSubmitForEdit(e, username, password) {
    const childDetail = {
      email: this.props.user.email,
      username: username,
      password: password
    };

    this.props.loginChildForEdit(childDetail, this.props.history);
  }

  onPurchase(e, childId) {
    this.props.history.push(
      '/subscriptions/' + btoa(this.props.user.email) + '/' + btoa(childId)
    );
  }

  render() {
    const { firstname, lastname } = this.props.user;
    const children = this.state.children;

    const myChildren = children.map((item, i) => {
      return (
        <div className="row mychildren__table center-align" key={i}>
          <div className="col l12 s12 m12 grey lighten-4">
            <div className="card white hoverable">
              <div className="card-content white-text">
                <div className="row">
                  <div className="col l3 m3 s12">
                    <span className="card-title black-text childHeading">
                      Child's Accounts
                    </span>
                  </div>
                  <div className="col l3 m3 s4">
                    <a
                      className="mychildren-btn"
                      onClick={e =>
                        this.onChildSubmit(e, item.username, item.password)}
                    >
                      Login as
                    </a>
                  </div>
                  <div className="col l3 m3 s4">
                    <a
                      className="mychildren-btn"
                      onClick={e =>
                        this.onChildSubmitForEdit(
                          e,
                          item.username,
                          item.password
                        )}
                    >
                      Edit your children details
                    </a>
                  </div>
                  <div className="col l3 m3 s4">
                    <a className="mychildren-btn">Add new child details</a>
                  </div>
                </div>
                <div className="childHeading-shift">
                  <div className="row">
                    <div className="col l3 m3 s6 cardText-heading">
                      First Name
                    </div>
                    <div className="col l3 m3 s6 cardText-heading">Surname</div>
                    <div className="col l2 m2 s6 cardText-heading">
                      Username
                    </div>
                    <div className="col l3 m3 s6 cardText-heading">
                      Password
                    </div>
                    <div className="col l1 m1 s6 cardText-heading">Grade</div>
                  </div>
                  <div className="row">
                    <div className="col l3 m3 s6 cardText-text">
                      {item.firstName}
                    </div>
                    <div className="col l3 m3 s6 cardText-text">
                      {item.surname}
                    </div>
                    <div className="col l2 m2 s6 cardText-text">
                      {item.username}
                    </div>
                    <div className="col l3 m3 s6 cardText-text">
                      {item.password}
                    </div>
                    <div className="col l1 m1 s6 cardText-text">
                      {item.schoolYear}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col l3 m3 s12">
                    <span className="card-title black-text childHeading">
                      Child's Subscription
                    </span>
                  </div>
                  <div className="col l3 m3 s4" />
                  <div className="col l3 m3 s4" />
                  <div className="col l3 m3 s4">
                    {item.subscriptionYear === '' ? (
                      <a
                        className="mychildren-btn"
                        onClick={e => this.onPurchase(e, item._id)}
                      >
                        purchase
                      </a>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="childHeading-shift2">
                  <div className="row">
                    <div className="col l8 m8 s6 cardText-heading2 left-align">
                      SUBSCRIPTION
                    </div>
                    <div className="col l2 m2 s6 cardText-heading2">STATUS</div>
                    <div className="col l2 m2 s6 cardText-heading2">
                      ACCESS END
                    </div>
                  </div>

                  <div className="row">
                    <div className="col l8 m5 s6 cardText-text2">
                      {item.subscriptionYear === ''
                        ? 'None'
                        : item.subscriptionYear}
                    </div>
                    <div className="col l2 m3 s6 cardText-text2">
                      {item.subscriptionYear === '' ? 'INACTIVE' : item.status}
                    </div>
                    <div className="col l2 m4 s6 cardText-text2" />
                  </div>
                </div>

                <div className="row margin-10per2">
                  <div className="col l3 m3 s12">
                    <span className="card-title black-text childHeading">
                      Child's Reports
                    </span>
                  </div>
                  <div className="col l3 m3 s4">
                    <a className="mychildren-btn">Certificates</a>
                  </div>
                  <div className="col l3 m3 s4">
                    <a className="mychildren-btn">Test Report</a>
                  </div>
                  <div className="col l3 m3 s4">
                    <a className="mychildren-btn">Comprehensive Report</a>
                  </div>
                </div>
                <div className="childHeading-shift2">
                  <div className="row">
                    <div className="col l3 m3 s6 cardText-heading2 left-align">
                      Average Test Result
                    </div>
                    <div className="col l3 m3 s6 cardText-heading2 left-align">
                      Performance Score
                    </div>
                    <div className="col l3 m3 s6 cardText-heading2 left-align">
                      Tests Completed
                    </div>
                    <div className="col l3 m3 s6 cardText-heading2 left-align">
                      Incomplete Tests
                    </div>
                  </div>

                  <div className="row">
                    <div className="col l3 m3 s6 cardText-text2 center-align">
                      0.00%
                    </div>
                    <div className="col l3 m3 s6 cardText-text2 center-align">
                      0
                    </div>
                    <div className="col l3 m3 s6 cardText-text2 center-align">
                      0
                    </div>
                    <div className="col l3 m3 s6 cardText-text2 center-align">
                      0
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <section className="dashboard grey lighten-5">
          <div className="row">
            <div className="col l3 s12 m4">
              <div className="card-panel">
                <img
                  className="responsive-img dashboard__avatar"
                  src="./images/user.svg"
                />
                <h5 className="dashboard__name">
                  {firstname + ' ' + lastname}
                </h5>
                <Link className="blue-text dashboard__edit" to="/editParent">
                  Edit profile
                </Link>
                <ul className="left-align dashboard__icons">
                  <li className="dashboard__icons-list">
                    <i className="material-icons dashboard__icons-image">
                      airplay
                    </i>
                    <span className="dashboard__icons-text">
                      See your children results
                    </span>
                  </li>
                  <li className="dashboard__icons-list">
                    <i className="material-icons dashboard__icons-image">
                      developer_mode
                    </i>
                    <span className="dashboard__icons-text">
                      Connect on mobile
                    </span>
                  </li>
                  <li className="dashboard__icons-list">
                    <i className="material-icons dashboard__icons-image">
                      favorite
                    </i>
                    <span className="dashboard__icons-text">Love educhamp</span>
                  </li>
                </ul>
              </div>
              <div className="row">
                <div className="col l12 s12 m12">
                  <h4 className="dashboard__addChild">Children</h4>
                  <div className="card-panel cardAddChildren">
                    <i className="material-icons dashboard__icons-image1 blue-text lighten-2">
                      add_circle_outline
                    </i>
                    <span className="dashboard__icons-text1">
                      <Link to="/addChildren" className="grey-text">
                        Add Children
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col l9 s12 m8">
              <div className="row">
                <div className="col l4 m6 s12">
                  <div className="card">
                    <div className="card-image">
                      <img src="./images/book.jpg" className="cardImage" />
                      <span className="card-title cardTitle">
                        Demo ClassName
                      </span>
                    </div>
                    <div className="card-content cardText">
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    </div>
                    <div className="card-action">
                      <a href="#" className="cardLink">
                        Get demo
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col l4 m6 s12">
                  <div className="card">
                    <div className="card-image">
                      <img src="./images/board.jpg" className="cardImage" />
                      <span className="card-title cardTitle">Results</span>
                    </div>
                    <div className="card-content cardText">
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    </div>
                    <div className="card-action">
                      <a href="#" className="cardLink">
                        See results
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col l4 m6 s12">
                  <div className="card">
                    <div className="card-image">
                      <img src="./images/dark.jpg" className="cardImage" />
                      <span className=" card-title cardTitle ">Ranking</span>
                    </div>
                    <div className="card-content cardText ">
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    </div>
                    <div className="card-action ">
                      <a href="#" className="cardLink">
                        Get rankings
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col l4 m6 s12 ">
                  <div className="card ">
                    <div className="card-image cardBlack">
                      <img src="./images/guy.jpg " className="cardImage" />
                      <span className="card-title cardTitle ">Invite</span>
                    </div>
                    <div className="card-content cardText ">
                      <p>
                        I am a very simple card. I am good at containing small
                        bits of information. I am convenient because I require
                        little markup to use effectively.
                      </p>
                    </div>
                    <div className="card-action ">
                      <a href="#" className="cardLink">
                        Invite others
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row table">
                <div className="col l12 m12 s12 card-panel mychildren">
                  <h3 className="mychildren__heading center-align">
                    My Children
                  </h3>
                  {myChildren}
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
  profile: state.profile.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {
  getProfile,
  loginChild,
  loginChildForEdit
})(withRouter(ParentDashboard));
