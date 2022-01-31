import logo from './logo.svg';
import './App.css';
import IssuerDashboard from './pages/issuerDashboard';
import InvestorDashboard from './pages/investorDashboard';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { loadWeb3 } from './functions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()

  const loadData=async()=>{

    loadWeb3(dispatch)

  }

  useEffect(()=>{

    loadData()

  })

  return (
    <div className="App">

      <BrowserRouter>
            <Router>
                  <div className="App">

                    <Switch>

                        <Route exact path='/issuer' component={IssuerDashboard} /> 

                        <Route path="/investor" component={InvestorDashboard}/>
                    </Switch>
                  
                  </div>
            </Router>
        </BrowserRouter>

    </div>
  );
}

export default App;
