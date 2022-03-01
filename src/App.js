import logo from './logo.svg';
// import './App.css';
import IssuerDashboard from './pages/issuerDashboard';
import InvestorDashboard from './pages/investorDashboard';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { loadAddress, loadWeb3 } from './functions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { checkWalletConnection, loadContract, loadBalances } from './functions';
import Sign from './pages/sign';
import Asset from "./pages/dashboard/assets"
import AssetLayout from "./pages/layout/AssetLayout"
import NewAsset from './pages/dashboard/NewAsset';
import Commodity from './pages/dashboard/Commodity';
import ClosedFund from './pages/dashboard/ClosedFund';
import ShareClass from './pages/dashboard/ShareClass';
import Home from './pages/Home';


function App() {

  const dispatch = useDispatch()

  const address = useSelector(
    state => get(state, 'loadWeb3Reducer.address', '')
  )




  const loadData = async () => {

    const web3 = loadWeb3(dispatch)

    if (web3) {

      console.log(web3)
      loadAddress(dispatch, web3)
      await loadContract(web3, dispatch)


    }

    checkWalletConnection(dispatch)

  }



  useEffect(() => {

    loadData()

  }, [])



  return (
    <div className="App">

      <BrowserRouter>
        <Router>
          <div className="App">

            <Switch>

              <Route exact path='/issuer' component={IssuerDashboard} />

              <Route path="/" component={Home} exact />
              <Route path="/investor" component={InvestorDashboard} exact />

              <Route path="/signature" component={Sign} exact />
              <AssetLayout>
                <Route path="/asset" component={Asset} exact />
                <Route path="/new/asset" component={NewAsset} exact />
                <Route path="/new/commodity" component={Commodity} exact />
                <Route path="/new/closed" component={ClosedFund} exact />
                <Route path="/new/class" component={ShareClass} exact />
              </AssetLayout>
            </Switch>

          </div>
        </Router>
      </BrowserRouter>

    </div>
  );
}

export default App;
