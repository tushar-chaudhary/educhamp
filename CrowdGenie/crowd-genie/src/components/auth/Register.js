import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      resetpassword: '',
      phone: '',
      childfirstname: '',
      childlastname: '',
      schoolyear: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
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
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      childfirstname: this.state.childfirstname,
      childlastname: this.state.childlastname,
      schoolyear: this.state.schoolyear
    };

    this.props.registerUser(newUser, this.props.history);
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
                <h4 className="white-text site-text">
                  New to Educhamp? Sign Up!
                </h4>
                <h5 className="white-text site-text2">
                  Create an account to get started
                </h5>
              </center>
            </div>
          </div>

          <div className="row getPadding">
            <div className="col l4 m5 s12">
              <h4 className="createAccount__myaccount">My Account</h4>
              <Link className="createAccount__alreadyhaveanaccount" to="/login">
                <h5 className="black-text">Already have an account</h5>
              </Link>
            </div>
            <div className="col l8 m7 s12 card-panel">
              <form className="col s12 ">
                <h4 className="createAccount__myaccount1">Create account</h4>
                <div className="row createAccount__form">
                  <div className="input-field col s6">
                    <input
                      id="firstname"
                      name="firstname"
                      value={this.state.firstname}
                      onChange={this.onChange}
                      type="text"
                    />
                    <label htmlFor="firstname">
                      First Name<sup>
                        <i className="fa fa-asterisk asterisk" />
                      </sup>
                    </label>
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="lastname"
                      name="lastname"
                      value={this.state.lastname}
                      onChange={this.onChange}
                      type="text"
                    />
                    <label htmlFor="lastname">
                      Last Name<sup>
                        <i className="fa fa-asterisk asterisk" />
                      </sup>
                    </label>
                  </div>
                </div>
                <div className="row createAccount__form1">
                  <div className="input-field col s6">
                    <input
                      id="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      type="text"
                    />
                    <label htmlFor="email">
                      Email<sup>
                        <i className="fa fa-asterisk asterisk" />
                      </sup>
                    </label>
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="phone"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.onChange}
                      type="text"
                    />
                    <label htmlFor="phone">
                      Phone<sup>
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
                  <div className="input-field col s6">
                    <input
                      id="resetpassword"
                      name="resetpassword"
                      value={this.state.resetpassword}
                      onChange={this.onChange}
                      type="password"
                    />
                    <label htmlFor="resetpassword">
                      Repeat Password<sup>
                        <i className="fa fa-asterisk asterisk" />
                      </sup>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col l4 m5 s12" />
              <div className="col l8 m7 s12 card-panel selectclass">
                <form className="col s12 ">
                  <h4 className="createAccount__myaccount1">
                    Create a new account for my child
                  </h4>
                  <div className="row createAccount__form">
                    <div className="input-field col s6">
                      <input
                        id="childfirstname"
                        name="childfirstname"
                        value={this.state.childfirstname}
                        onChange={this.onChange}
                        type="text"
                      />
                      <label htmlFor="childfirstname">
                        Child's First Name<sup>
                          <i className="fa fa-asterisk asterisk" />
                        </sup>
                      </label>
                    </div>
                  </div>
                  <div className="row createAccount__form1">
                    <div className="input-field col s6">
                      <input
                        id="childlastname"
                        name="childlastname"
                        value={this.state.childlastname}
                        onChange={this.onChange}
                        type="text"
                      />
                      <label htmlFor="childlastname">
                        Child's Surname<sup>
                          <i className="fa fa-asterisk asterisk" />
                        </sup>
                      </label>
                    </div>
                  </div>
                  <div className="row createAccount__form1">
                    <div className="input-field col s6">
                      <label>
                        &nbsp;Child's School Year<sup>
                          <i className="fa fa-asterisk asterisk" />
                        </sup>
                      </label>
                      <select
                        className="browser-default selectSize"
                        id="schoolyear"
                        name="schoolyear"
                        value={this.state.schoolyear}
                        onChange={this.onChange}
                      >
                        <option value="" disabled defaultValue>
                          Choose your option
                        </option>
                        <option value="6">Year 6</option>
                        <option value="7">Year 7</option>
                        <option value="8">Year 8</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col l12 m12 s12 right-align">
              <a
                className="popup__login btn btn-large black  white-text"
                onClick={this.onSubmit}
              >
                Create account
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
