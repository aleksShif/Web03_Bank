import {Link} from 'react-router-dom';
import MountainBackground from './Background';
import AccountBalance from './AccountBalance';
import './style.css';
const Credits = (props) => {


    let viewCreditsDesc = () =>{
        const {credits} = props
        return credits.map((credit) => {
            return <li className="creditListItem" key={credit.id}>{credit.description}</li>
        });
    }
    let viewCreditsAmount = () =>{
        const {credits} = props
        return credits.map((credit) => {
            return <li className="creditListItem" key={credit.id}>{credit.amount}</li>
        });
    }
    let viewCreditsDate = () =>{
        const {credits} = props
        return credits.map((credit) => {
            let date = credit.date.slice(0,10);
            return <li className="creditListItem" key={credit.id}>{date}</li>
        });
    }
        return ( 
            <div className="CreditsContainer">
                <MountainBackground />
                <div className="foreground profile">
                    <h1>Credits</h1>
                    <div className="info-container">
                        <br/>
                        <AccountBalance accountBalance={props.accountBalance} />
                    </div>
                    <div className="displayList">
                        <div className="column">
                            <h2>Description</h2>
                            {viewCreditsDesc()}
                        </div>

                        <div className="column">
                            <h2>Amount</h2>
                            {viewCreditsAmount()}
                        </div>

                        <div className="column">
                            <h2>Date</h2>
                            {viewCreditsDate()}
                        </div>
                    </div>

                    <form onSubmit={props.addCredit}>
                        <input type="text" name="description" placeholder='Description' required="true"/>
                        <input type="number" name="amount" placeholder='Amount' required="true" step="0.01"/>
                        <button type="submit" className="home-button">Add Credit</button>
                    </form>
                    <Link className="home-button" to="/">Return to Home</Link>            
                </div>
            </div>
        );
}

export default Credits; 