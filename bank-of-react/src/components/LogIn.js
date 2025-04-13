import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import './style.css';
import MountainBackground from './Background';

class LogIn extends Component {
  constructor () {  // Create and initialize state
    super();
    console.log("LogIn component constructed");
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false  // Redirect property used to trigger Redirect
    };
  }

  // When the user name input changes, capture the input and update the state (user.userName)
  handleChange = (e) => {
    // Create an object for state's user properties
    const updatedUser = {...this.state.user};  
    // Set object's userName to the new input value
    updatedUser.userName = e.target.value; 
    // Update state with object values 
    this.setState({user: updatedUser})  
  }

  // When user clicks on "Log In" button, store user data and then redirect to "User Profile" page
  handleSubmit = (e) => {
    e.preventDefault()
    console.log("Log In Button Clicked", this.state.user); 
    this.props.mockLogIn(this.state.user)
    this.setState({redirect: true}, () => {console.log("Redirect is set to: ", this.state.redirect);
    });  // Update state to trigger Redirect
  };

  render () {
    if (this.state.redirect) {  // Navigate to "User Profile" page 
      console.log("Redirecting to User Profile");
      return <Navigate to="/userProfile"/>;
    }
    // Render the login form
    return (
      <div className="home-container">
        <MountainBackground />
        <div className="foreground">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>User Name</label>
                <input type="text" name="userName" onChange={this.handleChange} />
              
            </div>
            <div>
              <label>Password</label>
                <input type="password" name="password" />
              
            </div>
            <button className="home-button">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;