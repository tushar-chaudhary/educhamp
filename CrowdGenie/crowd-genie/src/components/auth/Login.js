import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser, loginChild } from '../../actions/authActions';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      childUsername: '',
      childParentemail: '',
      childPassword: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChildSubmit = this.onChildSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    $('.tab-link').click(function() {
      var tabID = $(this).attr('data-tab');

      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');

      $('#tab-' + tabID)
        .addClass('active')
        .siblings()
        .removeClass('active');
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(newUser);
  }

  onChildSubmit(e) {
    const childDetail = {
      email: this.state.childParentemail,
      username: this.state.childUsername,
      password: this.state.childPassword
    };

    this.props.loginChild(childDetail, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar class="" />
        <section className="createAccount">
          <div className="row">
            <div className="col l12 m12 s12 createAccount__backText">
              <center
                style={{
                  position: 'absolute',
                  top: '32%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <h4 className="white-text site-text">Login to Educhamp</h4>
                <h5 className="white-text site-text2">
                  Get the Results You Want!
                </h5>
              </center>
            </div>
          </div>
          <div className="row getPadding">
            <div className="col l4 m4 s12">
              <h4 className="createAccount__myaccount">My Account</h4>
              <Link
                className="createAccount__alreadyhaveanaccount"
                to="/register"
              >
                <h5 className="black-text">Create an account</h5>
              </Link>
            </div>
            <div className="col l8 m8 s12">
              <div className="wrapper">
                <div className="tab-wrapper">
                  <ul className="tabs">
                    <li className="tab-link active" data-tab="1">
                      Parent login
                    </li>
                    <li className="tab-link" data-tab="2">
                      Children login
                    </li>
                  </ul>
                </div>
                <form className="col s12 ">
                  <div id="tab-1" className="tab-content active">
                    <h4 className="createAccount__myaccount3">
                      Parent's login
                    </h4>
                    <div className="row createAccount__form">
                      <div className="input-field col s6">
                        <input
                          id="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          type="text"
                        />
                        <label htmlFor="email">
                          Username or email address<sup>
                            <i className="fa fa-asterisk asterisk" />
                          </sup>
                        </label>
                      </div>
                    </div>
                    <div className="row createAccount__form1">
                      <div className="input-field col s6">
                        <input
                          id="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          type="password"
                        />
                        <label htmlFor="password">
                          Password<sup>
                            <i className="fa fa-asterisk asterisk" />
                          </sup>
                        </label>
                      </div>
                    </div>
                    <div className="row createAccount__form2">
                      <div className="input-field col s6">
                        <p>
                          <label>
                            <input type="checkbox" className="filled-in" />
                            <span className="createAccount__form2-span">
                              Remeber me
                            </span>
                          </label>
                        </p>
                      </div>
                    </div>
                    <div className="divider" />
                    <div className="row createAccount__form2">
                      <div className="input-field col s6">
                        <Link
                          to="/resetPassword"
                          className="createAccount__form2-span"
                        >
                          Lost your password?
                        </Link>
                      </div>
                      <div className="col s6 right-align">
                        <button type="button" className="btn btn-large black">
                          <a
                            className="popup__login  white-text"
                            onClick={this.onSubmit}
                          >
                            Sign in
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div id="tab-2" className="tab-content">
                    <h4 className="createAccount__myaccount3">
                      Children login
                    </h4>
                    <div className="row createAccount__form">
                      <div className="input-field col s6">
                        <input
                          id="childParentemail"
                          name="childParentemail"
                          value={this.state.childParentemail}
                          onChange={this.onChange}
                          type="text"
                        />
                        <label htmlFor="childParentemail">
                          Parent's email address<sup>
                            <i className="fa fa-asterisk asterisk" />
                          </sup>
                        </label>
                      </div>
                    </div>
                    <div className="row createAccount__form">
                      <div className="input-field col s6">
                        <input
                          id="childUsername"
                          name="childUsername"
                          value={this.state.childUsername}
                          onChange={this.onChange}
                          type="text"
                        />
                        <label htmlFor="childUsername">
                          Username<sup>
                            <i className="fa fa-asterisk asterisk" />
                          </sup>
                        </label>
                      </div>
                    </div>
                    <div className="row createAccount__form1">
                      <div className="input-field col s6">
                        <input
                          id="childPassword"
                          name="childPassword"
                          value={this.state.childPassword}
                          onChange={this.onChange}
                          type="password"
                        />
                        <label htmlFor="childPassword">
                          Password<sup>
                            <i className="fa fa-asterisk asterisk" />
                          </sup>
                        </label>
                      </div>
                    </div>
                    <div className="row createAccount__form2">
                      <div className="input-field col s6">
                        <p>
                          <label>
                            <input type="checkbox" className="filled-in" />
                            <span className="createAccount__form2-span">
                              Remeber me
                            </span>
                          </label>
                        </p>
                      </div>
                    </div>
                    <div className="divider" />
                    <div className="row createAccount__form2">
                      <div className="input-field col s6">
                        <Link
                          to="/resetPassword"
                          className="createAccount__form2-span"
                        >
                          Lost your password?
                        </Link>
                      </div>
                      <div className="col s6 right-align">
                        <a
                          className="popup__login btn btn-large black white-text"
                          onClick={this.onChildSubmit}
                        >
                          Sign in
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser, loginChild })(
  withRouter(Login)
);
