import React, { Component } from 'react';
import Navbar from './Navbar';
import { withRouter } from 'react-router-dom';
import { addChildren } from '../../actions/addChildrenActions';
import { connect } from 'react-redux';

class AddChildren extends Component {
  constructor() {
    super();
    this.state = {
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
      user: this.props.user.id,
      childfirstname: this.state.childfirstname,
      childlastname: this.state.childlastname,
      schoolyear: this.state.schoolyear
    };

    this.props.addChildren(newUser, this.props.history);
    this.props.history.push('/subscriptions');
  }

  render() {
    return (
      <div>
        <Navbar />
        <section className="addChildren">
          <div className="row">
            <div className="col l7 m12 s12 addChildren__img">
              <h1 className="addChildren__img-heading">Hello Parents!</h1>
              <h3 className="addChildren__img-heading1">
                You can create and add your child in minutes!
              </h3>
              <h5 className="addChildren__img-para">
                Once you add your child we will be able to guide him lorem ipsum
                dolor sit amet consectetur adipisicing elit. for itself. Read
                more<br />
                <br /> Once you add your child we will be able to guide him
                lorem ipsum dolor sit amet letting the quality of the product
                speak for itself. Read more<br />
                <br /> Once you add your child we will be able to guide him
                lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                aliquid, Read more
              </h5>
            </div>
            <div className="col l5 m12 s12 addChildren__form">
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
                <div className="row createAccount__form1 ">
                  <div className="input-field col s6">
                    <button type="button" className="btn  black">
                      <a
                        className="popup__login  white-text"
                        onClick={this.onSubmit}
                      >
                        Add Child
                      </a>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addChildren })(
  withRouter(AddChildren)
);
