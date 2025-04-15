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

  async componentDidMount(){
    let linkToAPIDebit = 'https://johnnylaicode.github.io/api/debits.json'; // link to debit API
    let linkToAPICredit = 'https://johnnylaicode.github.io/api/credits.json'; // do try and catch, but with link being to credits API
    
    let newBalance = 0;
    let dbList = [];
    let cdList = [];
    try {
      let response = await axios.get(linkToAPIDebit); // 
      //console.log(response.data)
      this.setState({debitData : response.data}); // set debit Data to list of JSON data, each representing a debit
      let list = response.data; // list of json data
      // 1 json elemen
      list.forEach(element => {
        console.log("added to list");
        const id = element.id; // id of debit
        const description = element.description; // description of debit
        const amount = element.amount; // amount of debit
        const date = element.date  // date of debit
        const newDebit = {
          id: id,
          description: description,
          amount: amount,
          date: date
        };
        console.log("amount is: ", parseFloat(amount)); 
        newBalance = Math.round((newBalance - parseFloat(amount))*100)/100;
        console.log("new balance is: ", newBalance);
        dbList.push(newDebit);
      });
      console.log("final balance is: ", this.state.accountBalance);
    }
    catch(error){
      if (error.response){
        console.log(error.response.data); // print error message
        console.log(error.response.status); // print out error code 
      }
    }


    try {
      let response = await axios.get(linkToAPICredit); // 
      console.log(response) // print out response
      this.setState({creditData : response.data}); // set state of debit List with response data
      let list = response.data; // list of json data
      list.forEach(element => {
        const id = element.id; // id of debit
        const description = element.description; // description of debit
        const amount = element.amount; // amount of debit
        const date = element.date  // date of debit
        const newCredit = {
          id: id,
          description: description,
          amount: amount,
          date: date
        };
        newBalance = Math.round((newBalance + parseFloat(amount))*100)/100;
        cdList.push(newCredit);
      });
    
    
    }
    catch(error){
      if (error.response){
        console.log(error.response.data); // print error message
        console.log(error.response.status); // print out error code 
      }
    }
    console.log("new balance is: ", newBalance);
    this.setState({accountBalance: newBalance});
    this.setState({debitList: dbList});
    this.setState({creditList: cdList});
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
