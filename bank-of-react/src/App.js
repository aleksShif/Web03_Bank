import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99'
      },
      debitData: [],
      creditData: []
    };
  };

  componentDidMount() {
    const linkToAPIDebit = 'https://johnnylaicode.github.io/api/debits.json'; // Link to debit API
    const linkToAPICredit = 'https://johnnylaicode.github.io/api/credits.json'; // Link to credit API

    Promise.all([
        axios.get(linkToAPIDebit),
        axios.get(linkToAPICredit)
    ])
    .then(([debitResponse, creditResponse]) => {
        console.log("Debit Data:", debitResponse.data);
        console.log("Credit Data:", creditResponse.data);
        const debitData = debitResponse.data;
        const creditData = creditResponse.data;

        const totalDebits = debitData.reduce((sum, debit) => sum + parseFloat(debit.amount), 0);
        const totalCredits = creditData.reduce((sum, credit) => sum + parseFloat(credit.amount), 0);

        const newBalance = Math.round((totalCredits - totalDebits) * 100) / 100;

        this.setState({
            debitList: debitData,
            creditList: creditData,
            accountBalance: newBalance
        }, () => {
          console.log("Updated State: ", this.state);
        });
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
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
    const newBalance = Math.round((parseFloat(this.state.accountBalance) - parseFloat(amount))*100) / 100;
    const debitEntry = this.state.debitList;
    debitEntry.push(newDebit)
    this.setState({debitList: debitEntry});
    this.setState({accountBalance: newBalance});
    
  };
  
  
  addCredit = (e) => {
    e.preventDefault()

    const id = this.state.creditList.length + 1;
    const description = e.target.description.value;
    const amount = parseFloat(e.target.amount.value);
    const d = new Date();
    const date = "" + (d.getFullYear()) +"-" +d.getMonth()+1 + "-" +d.getDate();
    const newCredit = {
      id: id,
      amount: amount,
      description: description,
      date: date
    }

    const currBalance = parseFloat(this.state.accountBalance);
    const newBalance = Math.round((currBalance + amount)*100) / 100;
    const creditEntry = [...this.state.creditList, newCredit];
    this.setState({
      creditList: creditEntry,
      accountBalance: newBalance
    });
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
      <Router basename="/Web03_Bank">
        <Routes>
          <Route exact path="/" element={<HomeComponent />} />
          <Route exact path="/login" element={<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />} />
          <Route exact path="/userProfile" element={<UserProfileComponent />} />
          <Route exact path="/credits" element={<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance}/>} />
          <Route exact path="/debits" element={<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance} />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
