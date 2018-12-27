import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editChildPassword } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

class EditChildPassword extends Component {
  constructor() {
    super();
    this.state = {
      currentpassword: '',
      newpassword: '',
      confirmpassword: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeProfile = this.onChangeProfile.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeProfile(e) {
    this.props.history.push('/editChild');
  }
  onChangePassword(e) {
    this.props.history.push('/editChildPassword');
  }
  onSubmit(e) {
    const newUser = {
      childId: this.props.user._id,
      currentpassword: this.state.currentpassword,
      newpassword: this.state.newpassword,
      email: this.props.user.email
    };

    this.props.editChildPassword(newUser, this.props.history);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar class="" />
        <section className="editParent">
          <div class="msg msg-info z-depth-3">
            You are now logged in as: {this.props.user.username}
          </div>
          <div className="row editParent__heading">
            <div className="col l12 s12 m12">
              <h3 className="editParent__heading-text">Account settings</h3>
            </div>
          </div>
          <div className="divider"> </div>
          <div className="row">
            <div className="col l3 m4 s4 editParent__tabs">
              <p
                className="editParent__tabs-text"
                onClick={this.onChangeProfile}
              >
                Edit profile
              </p>
              <p
                className="editParent__tabs-text"
                onClick={this.onChangePassword}
              >
                Change password
              </p>
              <p className="editParent__tabs-text">Language and region</p>
              <p className="editParent__tabs-text">Advanced</p>
              <p className="editParent__tabs-text">Privacy & Terms</p>
            </div>
            <div className="col l1 m1" />
            <div className="col l8 m7 s8">
              <form className="col s12 l10 m10">
                <h4 className="createAccount__myaccount1">Change password</h4>
                <div className="row createAccount__form">
                  <div className="input-field col s12 inline">
                    <input
                      id="currentpassword"
                      name="currentpassword"
                      value={this.state.currentpassword}
                      onChange={this.onChange}
                      type="text"
                    />
                    <label htmlFor="currentpassword">
                      Current password<sup>
                        <i className="fa fa-asterisk asterisk" />
                      </sup>
                    </label>
                  </div>
                </div>
                <div className="row createAccount__form1">
                  <div className="input-field col s6 inline">
                    <input
                      id="newpassword"
                      name="newpassword"
                      value={this.state.newpassword}
                      onChange={this.onChange}
                      type="text"
                    />
                    <label htmlFor="newpassword">
                      Password<sup>
                        <i className="fa fa-asterisk asterisk" />
                      </sup>
                    </label>
                  </div>
                  <div className="input-field col s6 inline">
                    <input
                      id="confirmpassword"
                      name="confirmpassword"
                      value={this.state.confirmpassword}
                      onChange={this.onChange}
                      type="text"
                    />
                    <label for="confirmpassword">
                      Confirm password<sup>
                        <i className="fa fa-asterisk asterisk" />
                      </sup>
                    </label>
                  </div>
                </div>
                <a
                  className="popup__login btn  right edit"
                  onClick={this.onSubmit}
                >
                  Edit password
                </a>
              </form>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(mapStateToProps, { editChildPassword })(
  withRouter(EditChildPassword)
);
