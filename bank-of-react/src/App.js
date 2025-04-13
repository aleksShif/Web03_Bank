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
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99'
      },
      debitData: [],
      creditData: []
    };
  }

  async componentDidMount(){
    let linkToAPI = 'https://johnnylaicode.github.io/api/debits.json'; // link to debit API

    try {
      let response = await axios.get(linkToAPI); // 
      console.log(response) // print out response
      console.log(response.data)
      this.setState({debitData : response.data}); // set debit Data to list of JSON data, each representing a debit
    }
    catch(error){
      if (error.response){
        console.log(error.response.data); // print error message
        console.log(error.response.status); // print out error code 
      }
    }

    linkToAPI = 'https://johnnylaicode.github.io/api/credits.json'; // do try and catch, but with link being to credits API
    try {
      let response = await axios.get(linkToAPI); // 
      console.log(response) // print out response
      this.setState({creditData : response.data}); // set state of debit List with response data
    }
    catch(error){
      if (error.response){
        console.log(error.response.data); // print error message
        console.log(error.response.status); // print out error code 
      }
    }
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
  
  
  addCredit = (e) => {
    e.preventDefault()

    const id = this.state.creditList.length + 1;
    const description = e.target.description.value;
    const amount = e.target.amount.value;
    const d = new Date();
    const date = "" + (d.getFullYear()) +"-" +d.getMonth()+1 + "-" +d.getDate();
    const newCredit = {
      id: id,
      amount: amount,
      description: description,
      date: date
    }

    const newBalance = parseInt(this.state.accountBalance) + amount;
    const creditEntry = this.state.creditList;
    creditEntry.push(newCredit);
    this.setState({creditList: creditEntry});
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
          <Route exact path="/credits" element={<Credits credits={this.state.creditList} addCredit={this.addCredit}/>} />
          <Route exact path="/debits" element={<Debits debits={this.state.debitList} addDebit={this.addDebit}/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
