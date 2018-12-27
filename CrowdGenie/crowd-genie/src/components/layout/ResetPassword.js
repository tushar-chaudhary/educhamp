import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { resetPassword } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const email = {
      email: this.state.email
    };

    console.log(email);

    this.props.resetPassword(email, this.props.history);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar class="" />
        <section className="resetAccount">
          <div className="row center">
            <div className="col l4 m3" />
            <div className="col l4 m6 s12 card-panel resetAccount__card">
              <form className="col s12">
                <h4 className="resetAccount__heading">Reset Password</h4>
                <p className="resetAccount__text">
                  Enter your email, and we'll send you a new password.
                </p>
                <div className="input-field">
                  <input
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    className="resetAccount__inputBox"
                    type="text"
                    placeholder="&nbsp;Email"
                  />
                </div>
                <a
                  className="btn resetAccount__button col s12"
                  onClick={this.onSubmit}
                >
                  Reset Password
                </a>
              </form>
              <div className="col l4 m3" />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  errors: state.errors
});

export default connect(mapStateToProps, { resetPassword })(
  withRouter(ResetPassword)
);
