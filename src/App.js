import logo from './logo.svg';
import './App.css';
import IssuerDashboard from './pages/issuerDashboard';
import InvestorDashboard from './pages/investorDashboard';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">

<BrowserRouter>
      <Router>
            <div className="App">

              <Switch>

                  <Route exact path='/' component={IssuerDashboard} /> 

                  <Route path="/stat" component={InvestorDashboard}/>
              </Switch>
             
            </div>
      </Router>
    </BrowserRouter>

    </div>
  );
}

export default App;
