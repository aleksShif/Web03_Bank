import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
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
  };

  addDebit = (e) => {
    e.preventDefault();

    const id = this.state.debitList.length + 1;
    const description = e.target.description.value;
    const amount = e.target.amount.value;
    const d = new Date(); 
    const date = "" +(d.getMonth()+1) +"-" +d.getDate() + "-" +d.getFullYear();
    
    const newDebit = {
      id: id,
      amount: amount,
      description: description,
      date: date
    };

    const newBalance = parseInt(this.state.accountBalance) + amount;
    const debitEntry = this.state.debitList;
    debitEntry.push(newDebit)
    this.setState({debitList: debitEntry});
    this.setState({accountBalance: newBalance});
    
  }; 


  render() {
    const HomeComponent = () => (
      <Home userName={this.state.currentUser.userName} accountBalance={this.state.accountBalance} />
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
          <Route exact path="/credits" element={<Credits credits={this.state.creditList} />} />
          <Route exact path="/debits" element={<Debits debits={this.state.debitList} addDebit={this.addDebit}/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
