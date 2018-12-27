import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editParentProfile } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

class EditParent extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeProfile = this.onChangeProfile.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const { user } = this.props;
    this.setState({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeProfile(e) {
    this.props.history.push('/editParent');
  }
  onChangePassword(e) {
    this.props.history.push('/editParentPassword');
  }
  onSubmit(e) {
    const newUser = {
      email: this.state.email,
      oldemail: this.props.user.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone
    };

    this.props.editParentProfile(newUser, this.props.history);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar class="" />
        <section className="editParent">
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
                <h4 className="createAccount__myaccount1">Edit account</h4>
                <div className="row createAccount__form3">
                  <div className="input-field col s6 inline">
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
                  <div className="input-field col s6 inline">
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
                <div className="row createAccount__form4">
                  <div className="input-field col s6 inline">
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
                  <div className="input-field col s6 inline">
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
                <a
                  className="popup__login btn  right edit"
                  onClick={this.onSubmit}
                >
                  Edit account
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

export default connect(mapStateToProps, { editParentProfile })(
  withRouter(EditParent)
);
