import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 1234567.89,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99'
      }
    };
  }

  mockLogIn = (logInInfo) => {
    console.log("mockLogIn called with: ", logInInfo);
    const newUser = {...this.state.currentUser}; 
    newUser.userName = logInInfo.userName; 
    this.setState({currentUser: newUser});
  }

  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );

    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeComponent />} />
          <Route exact path="/login" element={<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />} />
          <Route exact path="/userProfile" element={<UserProfileComponent />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
