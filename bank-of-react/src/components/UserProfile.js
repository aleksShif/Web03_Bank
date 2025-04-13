import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MountainBackground from './Background';
import './style.css';

class UserProfile extends Component {
    render() {
        return (
            <div className="home-container">
                <MountainBackground/>
                <div className="foreground profile">
                    <h1>User Profile</h1>

                    <div>Username: {this.props.userName}</div>
                    <div>Member Since: {this.props.memberSince}</div>
                    <br/>
                    <Link className="home-button" to="/">Return to Home</Link>
                </div>
            </div>
        );
    }
}

export default UserProfile; 