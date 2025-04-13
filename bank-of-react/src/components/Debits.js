import {Link} from 'react-router-dom';
import MountainBackground from './Background';
import AccountBalance from './AccountBalance';
import './style.css';
const Debits = (props) => {


    let viewDebitsDesc = () =>{
        const {debits} = props
        return debits.map((debit) => {
            return <li className="debitListItem" key={debit.id}>{debit.description}</li>
        });
    }
    let viewDebitsAmount = () =>{
        const {debits} = props
        return debits.map((debit) => {
            return <li className="debitListItem" key={debit.id}>{debit.amount}</li>
        });
    }
    let viewDebitsDate = () =>{
        const {debits} = props
        return debits.map((debit) => {
            let date = debit.date.slice(0,10);
            return <li className="debitListItem" key={debit.id}>{date}</li>
        });
    }
        return ( 
            <div className="DebitsContainer">
                <MountainBackground />
                <div className="foreground profile">
                    <h1>Debits</h1>
                    <div className="info-container">
                        <br/>
                        <AccountBalance accountBalance={props.accountBalance} />
                    </div>
                    <div className="displayList">
                        <div className="column">
                            <h2>Description</h2>
                            {viewDebitsDesc()}
                        </div>

                        <div className="column">
                            <h2>Amount</h2>
                            {viewDebitsAmount()}
                        </div>

                        <div className="column">
                            <h2>Date</h2>
                            {viewDebitsDate()}
                        </div>
                    </div>

                    <form onSubmit={props.addDebit}>
                        <input type="text" name="description" placeholder='Description' required="true"/>
                        <input type="number" name="amount" placeholder='Amount' required="true" step="0.01"/>
                        <button type="submit" className="home-button">Add Debit</button>
                    </form>
                    <Link className="home-button" to="/">Return to Home</Link>            
                </div>
            </div>
        );
}

export default Debits; 