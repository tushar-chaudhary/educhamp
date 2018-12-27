import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserSubscription } from '../../actions/authActions';
import { addSubscriptionToChildren } from '../../actions/addChildrenActions';

class Subscriptions extends Component {
  constructor() {
    super();
    this.state = {
      subscriptionType: '',
      subscriptionYear: '',
      subscriptionPrice: '',
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
    this.setState({
      subscriptionType: 'true',
      subscriptionYear: e.target.name,
      subscriptionPrice: e.target.id
    });
  }

  onSubmit(e) {
    if (
      this.props.match.params.parentEmail !== undefined &&
      this.props.match.params.childId !== undefined
    ) {
      const subscriptionInfo = {
        subscriptionYear: this.state.subscriptionYear,
        subscriptionPrice: this.state.subscriptionPrice,
        email: atob(this.props.match.params.parentEmail),
        id: atob(this.props.match.params.childId)
      };
      this.props.updateUserSubscription(subscriptionInfo);
      this.props.history.push('/payment');
    } else {
      const subscriptionInfo = {
        subscriptionType: this.state.subscriptionType,
        subscriptionYear: this.state.subscriptionYear,
        subscriptionPrice: this.state.subscriptionPrice,
        email: this.props.user.email,
        id: this.props.user.id
      };

      const { otherChildren } = this.props;

      if (
        (Object.keys(otherChildren).length === 0 &&
          otherChildren.constructor === Object) === false
      ) {
        const ChildInfo = {
          subscriptionType: this.state.subscriptionType,
          subscriptionYear: this.state.subscriptionYear,
          subscriptionPrice: this.state.subscriptionPrice,
          subscriptionUser:
            this.props.user.id === undefined
              ? this.props.user._id
              : this.props.user.id,
          subscriptionFirstName: otherChildren.childfirstname,
          subscriptionSurname: otherChildren.childlastname,
          subscriptionSchoolYear: otherChildren.schoolyear
        };
        this.props.addSubscriptionToChildren(ChildInfo);
      } else {
        this.props.updateUserSubscription(subscriptionInfo);
      }
      this.props.history.push('/payment');
    }
  }

  render() {
    return (
      <div>
        <Navbar class="main-header2" />
        <section className="subscription">
          <div className="row subscription__center">
            <div className="subscription__margin">
              <div className="col l4 s12 m6">
                <div className="card darken-1 teal ">
                  <div className="card-content white-text  center">
                    <span className="card-title black-text subscription__title center">
                      Year 6
                    </span>
                    <h3 className="white-text text-lighten-1 center subscription__price">
                      <sup className="dollar">
                        <i className="fa fa-dollar" />
                      </sup>34.56
                    </h3>
                    <h4 className="white-text center subscription__year">
                      /year
                    </h4>

                    <a
                      className="popup__login white-text btn btn-large black subscription__upgrade"
                      name="Year 6"
                      id="34.56"
                      onClick={this.onChange}
                    >
                      UPGRADE
                    </a>

                    <div className="subcription__benifits">
                      <h3 className="black-text text-lighten-1 center subscription__year2">
                        INCLUDES 2 USERS
                      </h3>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Scorecards
                      </h4>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Tests
                      </h4>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Contents
                      </h4>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Dashboards
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col l4 s12 m6">
                <div className="card darken-1 red darken-4">
                  <div className="card-content white-text  center">
                    <span className="card-title black-text subscription__title center">
                      Year 7
                    </span>
                    <h3 className="white-text text-lighten-1 center subscription__price">
                      <sup className="dollar">
                        <i className="fa fa-dollar" />
                      </sup>36.56
                    </h3>
                    <h4 className="white-text center subscription__year">
                      /year
                    </h4>

                    <a
                      className="popup__login white-text btn black btn-large subscription__upgrade"
                      name="Year 7"
                      id="36.56"
                      onClick={this.onChange}
                    >
                      UPGRADE
                    </a>

                    <div className="subcription__benifits">
                      <h3 className="black-text text-lighten-1 center subscription__year2">
                        INCLUDES 3 USERS
                      </h3>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Scorecards
                      </h4>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Tests
                      </h4>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Contents
                      </h4>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Dashboards
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col l4 s12 m6">
                <div className="card darken-1 purple darken-3">
                  <div className="card-content white-text  center">
                    <span className="card-title black-text subscription__title center">
                      Year 8
                    </span>
                    <h3 className="white-text text-lighten-1 center subscription__price">
                      <sup className="dollar">
                        <i className="fa fa-dollar" />
                      </sup>65.56
                    </h3>
                    <h4 className="white-text center subscription__year">
                      /year
                    </h4>

                    <a
                      className="popup__login white-text btn btn-large black subscription__upgrade"
                      name="Year 8"
                      id="65.56"
                      onClick={this.onChange}
                    >
                      UPGRADE
                    </a>

                    <div className="subcription__benifits">
                      <h3 className="black-text text-lighten-1 center subscription__year2">
                        INCLUDES 4 USERS
                      </h3>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Scorecards
                      </h4>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Tests
                      </h4>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Contents
                      </h4>
                      <h4 className="white-text center subscription__year1">
                        Unlimited Dashboards
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col l12 s12 m12 right-align">
                <h5 className="moreinfo__explore2">
                  Explore our more options &rarr;
                </h5>
              </div>
            </div>
            <div className="row">
              <div className="col l12 m12 s12 right-align continuebtn">
                <a
                  className="popup__login  white-text btn btn-large black"
                  onClick={this.onSubmit}
                >
                  Continue
                </a>
              </div>
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
  updateUserSubscription,
  addSubscriptionToChildren
})(withRouter(Subscriptions));
