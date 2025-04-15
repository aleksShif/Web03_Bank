import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import MountainBackground from './Background';
import './style.css'; 

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <MountainBackground /> 

                <header className="header">
                    <h1>Bank of React</h1>
                    <nav className="home-header-nav">
                        <Link to="/userProfile" className="home-button">User Profile</Link>
                        <Link to="/login" className="home-button">Login</Link>
                    </nav>
                </header>

                <div className="foreground">
                    {/*<img src="/bank-of-react/public/images/black-cat.avif" alt="bank" /> */}
                    <div className="info-container">
                        <h1>Welcome, {this.props.userName}</h1>

                        <Link to="/credits" className="home-button">Credits</Link>
                        <br/>
                        <Link to="/debits" className="home-button">Debits</Link>
                        <br/>
                    </div>
                    <div className="info-container">
                        <br/>
                        <AccountBalance accountBalance={this.props.accountBalance} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;