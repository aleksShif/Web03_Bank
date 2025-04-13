import React, {Component} from 'react';

class AccountBalance extends Component {
    render() {
        return (
            <div> 
                Balance:
                <span style={{ color: this.props.accountBalance < 0 ? 'red' : 'green', fontWeight: 'bold'}}>
                 {this.props.accountBalance < 0 ? ` -$${Math.abs(this.props.accountBalance)}` : ` $${this.props.accountBalance}`}
                </span>
            </div>
        );
    }
}

export default AccountBalance; 