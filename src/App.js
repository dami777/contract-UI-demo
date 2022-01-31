import logo from './logo.svg';
import './App.css';
import IssuerDashboard from './pages/issuerDashboard';
import InvestorDashboard from './pages/investorDashboard';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { loadAddress, loadWeb3 } from './functions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

function App() {

  const dispatch = useDispatch()

  const web3 = useSelector(
    state => get(state, 'loadWeb3Reducer.web3', {})
  )

  const loadData=async()=>{

    const web3 = loadWeb3(dispatch)

    if (web3) {
      loadAddress(dispatch, web3)
    }
   

  }

  

  useEffect(()=>{

    loadData()
    
  }, [])

 

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
