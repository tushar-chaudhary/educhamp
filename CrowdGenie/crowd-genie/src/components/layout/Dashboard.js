import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import ParentDashboard from './ParentDashboard';
import Subscriptions from './Subscriptions';

class Dashboard extends Component {
  render() {
    const isSubscribed = this.props.user.subscriptionType;

    return (
      <React.Fragment>
        {isSubscribed === 'false' ? (
          <Subscriptions />
        ) : (
          <React.Fragment>
            <Navbar />
            <ParentDashboard
              userId={
                this.props.user.id === undefined
                  ? this.props.user._id
                  : this.props.user.id
              }
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.auth.user.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {})(Dashboard);
