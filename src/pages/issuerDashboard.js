import ConnectWallet from "../components/connectWallet"
import { useSelector, useDispatch } from "react-redux"
import { get } from "lodash"
import { useEffect, useState } from "react"
import {  issueToken, addToWhiteList, setRegulatorOnChain } from "../functions"
import { token } from "../helpers"
import CreateOrder from "../components/createOrder"

const IssuerDashboard = () =>{

    const dispatch = useDispatch()

    const address = useSelector(
        state => get(state, 'loadWeb3Reducer.address', '')
     )

    const contract = useSelector(
        state => get(state, 'loadWeb3Reducer.erc1400contract', {})
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

    const createdOrder = useSelector(
        state => get(state, 'loadEventsReducer.issuerOpenedEvent', [])
    )

    //  const pending order 

    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('')
    const [whiteListAddress, setwhiteListAddress] = useState('')
    const [regulator, setRegulator] = useState('')

    
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
                    <h2>Total Supply: {token(totalSupply)}</h2> 
                </div>
            </div>

            <div className="issuance">
                    <div>
                        <input type="text" placeholder="address" value={recipient} onChange={(e)=>setRecipient(e.target.value)}/>
                        <input type="text" placeholder="1000" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                        <button onClick={()=>issueToken(contract, dispatch, address, recipient, amount)}
                         className="issue-token">issue</button>
                    </div>


                    <div className="whitelist-cont">
                        <input type="text" placeholder="address" value={whiteListAddress} onChange={(e)=>setwhiteListAddress(e.target.value)}/>
                        <button onClick={()=>addToWhiteList(contract, whiteListAddress, address)}
                         className="whitelist-address">whitelist</button>
                    </div>
            </div>


            <h5>Create DVP order</h5>
            <CreateOrder />


            <h3>Set Regulator</h3>
            <input value={regulator} onChange={(e)=>setRegulator(e.target.value)}/>
            <button onClick={()=>setRegulatorOnChain(contract, regulator, address)}>set regulator</button>
            
        </div>
    )

}


export default IssuerDashboard