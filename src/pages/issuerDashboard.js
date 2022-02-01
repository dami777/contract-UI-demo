import ConnectWallet from "../components/connectWallet"
import { useSelector, useDispatch } from "react-redux"
import { get } from "lodash"
import { useEffect } from "react"
import {  issueToken } from "../functions"

const IssuerDashboard = () =>{

    const dispatch = useDispatch()

    const address = useSelector(
        state => get(state, 'loadWeb3Reducer.address', '')
     )

    const contract = useSelector(
        state => get(state, 'loadWeb3Reducer.contract', {})
    )


    const tokenName = useSelector(
        state => get(state, 'loadTokenDataReducer.name', '')
    )


    const totalSupply = useSelector(
        state => get(state, 'loadTokenDataReducer.totalSupply', '')
    )

    const tokenSymbol = useSelector(
        state => get(state, 'loadTokenDataReducer.symbol', '')
    )


    return (
        <div>


            <ConnectWallet />
            <div className="about-token">
                <div className="token-meta-data">
                    <p>{address}</p>
                    <h2>Token Name: {tokenName}</h2>
                    <h2>Symbol: {tokenSymbol}</h2>
                </div>

                <div className="total-supply">
                    <h2>Total Supply: {totalSupply}</h2> 
                </div>
            </div>

            <div className="issuance">
                    <div>
                        <input type="text" placeholder="address"/>
                        <input type="text" placeholder="1000"/>
                        <button onClick={()=>issueToken(contract, dispatch)}
                         className="issue-token">issue</button>
                    </div>


                    <div className="whitelist-cont">
                        <input type="text" placeholder="address"/>
                        <button className="whitelist-address">whitelist</button>
                    </div>
            </div>
            
        </div>
    )

}


export default IssuerDashboard