import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/layout/Home';
import Landing from './components/layout/Landing';
import Question from './components/question/Question';
import ResetPassword from './components/layout/ResetPassword';
import Dashboard from './components/layout/Dashboard';
import Subscriptions from './components/layout/Subscriptions';
import Payments from './components/layout/Payments';
import EditParent from './components/layout/EditParent';
import EditParentPassword from './components/layout/EditParentPassword';
import EditChild from './components/layout/EditChild';
import EditChildPassword from './components/layout/EditChildPassword';
import Testreport from './components/question/Testreport';
import ChildDashboard from './components/layout/ChildDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AddChildren from './components/layout/AddChildren';
import store from './store';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser, loginUser } from './actions/authActions';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/subscriptions" component={Subscriptions} />
            <Route
              exact
              path="/subscriptions/:parentEmail/:childId"
              component={Subscriptions}
            />
            <Route exact path="/payment" component={Payments} />
            <Route exact path="/addChildren" component={AddChildren} />
            <Route exact path="/resetPassword" component={ResetPassword} />
            <Route exact path="/childDashboard" component={ChildDashboard} />
            <Route
              exact
              path="/question/:childClass/:selectedSubject/:testType/:index"
              component={Question}
            />
            <Route exact path="/editParent" component={EditParent} />
            <Route
              exact
              path="/editParentPassword"
              component={EditParentPassword}
            />
            <Route exact path="/editChild" component={EditChild} />
            <Route exact path="/testreport" component={Testreport} />
            <Route
              exact
              path="/editChildPassword"
              component={EditChildPassword}
            />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
