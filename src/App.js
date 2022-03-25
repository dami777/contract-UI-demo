import logo from './logo.svg';
import './App.css';
import IssuerDashboard from './pages/issuerDashboard';
import InvestorDashboard from './pages/investorDashboard';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { loadAddress, loadWeb3 } from './functions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { checkWalletConnection, loadContract, loadBalances } from './functions';
import Sign from './pages/sign';


function App() {

  const dispatch = useDispatch()

 

  const loadData=async()=>{

    const web3 = loadWeb3(dispatch)

    if (web3) {

      console.log(web3)
      loadAddress(dispatch, web3)
      await loadContract(web3, dispatch)
      
      
    }
   
    checkWalletConnection(dispatch)

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

                        <Route path="/signature" component={Sign} />
                    </Switch>
                  
                  </div>
            </Router>
        </BrowserRouter>

    </div>
  );
}

export default App;
