import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
  constructor() {
    super();

    this.onHomeClick = this.onHomeClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  onHomeClick(e) {
    this.props.history.push('/');
  }

  onLoginClick(e) {
    this.props.history.push('/login');
  }

  onRegisterClick(e) {
    this.props.history.push('/register');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps === this.props) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <header className={this.props.class !== '' ? this.props.class : ''}>
          <div className={this.props.class !== '' ? 'primary-overlay' : ''}>
            <div className="navbar-fixed">
              <nav className="nav-main">
                <ul>
                  <li>
                    <i className="fa fa-adjust fa-3x icon">
                      <span className="icon-text" onClick={this.onHomeClick}>
                        Educhamp
                      </span>
                    </i>
                  </li>
                  <div>
                    <li>
                      <a className="item">
                        <span className="underline">Search</span>
                      </a>
                    </li>
                    {isAuthenticated ? (
                      <React.Fragment>
                        <li>
                          <a className="item">
                            <span
                              className="underline"
                              onClick={this.onLogoutClick}
                            >
                              Logout
                            </span>
                          </a>
                        </li>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <li>
                          <a className="item">
                            <span
                              className="underline"
                              onClick={this.onLoginClick}
                            >
                              Login
                            </span>
                          </a>
                        </li>
                        <li>
                          <a className="item">
                            <span
                              className="underline"
                              onClick={this.onRegisterClick}
                            >
                              Signup
                            </span>
                          </a>
                        </li>
                      </React.Fragment>
                    )}
                  </div>
                </ul>
              </nav>
            </div>
            {this.props.class === 'main-header' ? (
              <div className="row valign-wrapper">
                <div className="site-info">
                  <div className="col l12 s12 m12">
                    <h1 className="site-text center-align">
                      Fall in love with learning
                    </h1>
                    <h5 className="site-text2 hide-on-med-and-down">
                      Come and join India's best teachers and experience
                      revolutionary way to learn
                    </h5>
                    <button className="waves-effect button button5 transparent">
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
            {this.props.class === 'main-header2' ? (
              <div className="site-info center">
                <h1 className="flow-text site-text center-align">
                  Plans & Pricing
                </h1>
                <h5 className="flow-text site-text2">
                  Get started on your journey in less than 5 minutes.
                </h5>
                <h5 className="flow-text site-text2">
                  Learn something new. Change the world.
                </h5>
              </div>
            ) : (
              ''
            )}
          </div>
        </header>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
