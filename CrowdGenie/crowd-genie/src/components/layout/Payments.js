import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  updateUserSubscription_Set,
  skipSubscription
} from '../../actions/authActions';
import { addChildrenToProfile } from '../../actions/addChildrenActions';

class Payments extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };

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

  onSubmit(e) {
    const subscriptionInfo = {
      subscriptionType: this.props.user.subscriptionType,
      subscriptionYear: this.props.user.subscriptionYear,
      subscriptionPrice: this.props.user.subscriptionPrice,
      email: this.props.user.email,
      id: this.props.user.id
    };

    let { otherChildren } = this.props;

    //Checking if it is the first Child or other than first Child
    if (
      (Object.keys(otherChildren).length === 0 &&
        otherChildren.constructor === Object) === false
    ) {
      this.props.addChildrenToProfile(otherChildren, this.props.history);
    } else {
      this.props.updateUserSubscription_Set(
        subscriptionInfo,
        this.props.history
      );
    }
  }

  onSkip(e) {
    const subscriptionInfo = {
      email: this.props.user.email
    };

    this.props.skipSubscription(subscriptionInfo, this.props.history);
  }

  render() {
    let { subscriptionYear, subscriptionPrice } = this.props.user;

    const { otherChildren } = this.props;

    //Checking if it is the first Child or other than first Child
    if (
      (Object.keys(otherChildren).length === 0 &&
        otherChildren.constructor === Object) === false
    ) {
      subscriptionYear = otherChildren.subscriptionYear;
      subscriptionPrice = otherChildren.subscriptionPrice;
    }
    return (
      <div>
        <Navbar class="" />
        <section className="payment">
          <div className="row">
            <div className="col l4 m5 s12 center card-panel">
              <h3 className="payment__name">{subscriptionYear}</h3>
              <h3 className="black-text center payment__price">
                <sup className="dollar">
                  <i className="fa fa-dollar" />
                </sup>
                {subscriptionPrice}
              </h3>
              <h4 className="black-text center payment__year">/year</h4>
              <h5 className="black-text center payment__detail">
                All our core features Live training environment with real
                servers Hundreds of high quality videos Downloadable MP3s
                Hands-on operational labs New content added quarterly
              </h5>

              <a
                className="popup__login btn  edit margin-3pertop-bot"
                onClick={e => this.onSkip(e)}
              >
                Skip payment
              </a>
            </div>
            <div className="col l1 m1" />
            <div className="col l7 m6 s12">
              <h3 className="payment__option">Choose a Payment Option</h3>
              <div className="divider payment__divider" />
              <form>
                <div className="row">
                  <div className="col l12 m12 s12 payment__payoptions">
                    <p>
                      <label>
                        <input name="group1" type="radio" />
                        <span className="optionspan">Credit Card</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input name="group1" type="radio" />
                        <span className="optionspan">Paypal</span>
                      </label>
                    </p>
                  </div>
                </div>
                <div className="row createAccount__form">
                  <div className="input-field col s6">
                    <input id="first_name" type="text" />
                    <label htmlFor="first_name">
                      Credit Card Number (No Spaces)
                    </label>
                  </div>
                  <div className="input-field col s3">
                    <input id="last_name" type="text" id="last_name" />
                    <label htmlFor="last_name">Expiration Date</label>
                  </div>
                  <div className="input-field col s3">
                    <input id="last_name" type="text" id="last_name" />
                  </div>
                </div>
                <div className="row createAccount__form">
                  <div className="input-field col s6">
                    <input id="first_name" type="text" />
                    <label htmlFor="first_name">First Name on Card</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="last_name" type="text" id="last_name" />
                    <label htmlFor="last_name">Security Code</label>
                  </div>
                </div>
                <div className="row createAccount__form">
                  <div className="input-field col s6">
                    <input id="first_name" type="text" />
                    <label htmlFor="first_name">Last Name on Card</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="last_name" type="text" id="last_name" />
                    <label htmlFor="last_name">Postal Code</label>
                  </div>
                </div>
                <div className="row createAccount__form">
                  <div className="input-field col s6">
                    <input id="first_name" type="text" />
                    <label htmlFor="first_name">Street Address</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="last_name" type="text" id="last_name" />
                    <label htmlFor="last_name">Country</label>
                  </div>
                </div>
                <div className="col l12 m12 s12 right-align">
                  <button type="button" className="btn btn-large black">
                    <a
                      className="popup__login  white-text"
                      onClick={this.onSubmit}
                    >
                      Pay
                    </a>
                  </button>
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
  profile: state.auth.user.profile,
  errors: state.errors,

  //other than  first Child
  otherChildren: state.childSubscription.childDetails
});

export default connect(mapStateToProps, {
  updateUserSubscription_Set,
  addChildrenToProfile,
  skipSubscription
})(withRouter(Payments));
