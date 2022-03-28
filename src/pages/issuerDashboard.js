import ConnectWallet from "../components/connectWallet"
import { useSelector, useDispatch } from "react-redux"
import { get, reject } from "lodash"
import { useEffect, useState } from "react"
import {  issueToken, addToWhiteList, setRegulatorOnChain, preprocessExpiredOrders, preprocessFundedOrders, withDrawPayment } from "../functions"
import { token, tokensWei } from "../helpers"
import CreateOrder from "../components/createOrder"



const IssuerDashboard = () =>{

    const dispatch = useDispatch()

    const address = useSelector(
        state => get(state, 'loadWeb3Reducer.address', '')
    )

    const web3 = useSelector(
        state => get(state, 'loadWeb3Reducer.web3', {})
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
        state => get(state, 'loadEventsReducer.investorOpenedEvent', [])
    )

    const closedOrders = useSelector(
        state => get(state, 'loadEventsReducer.investorClosedEvent', [])
    )

    const htlc20Contract = useSelector(
        state => get(state, 'loadWeb3Reducer.htlc20contract', {})
    )



    const _preprocessExpiredOrders = preprocessExpiredOrders(createdOrder)
   // const _preprocessedFundedOrders = preprocessFundedOrders(_preprocessExpiredOrders, htlc20Contract)
    const openOrders = reject(_preprocessExpiredOrders, (order)=>{

        const _closed = closedOrders.some((closedOrder)=>closedOrder._swapID == order._swapID)
        return _closed

    })
    
    




    //  const pending order 

    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('')
    const [whiteListAddress, setwhiteListAddress] = useState('')
    const [regulator, setRegulator] = useState('')
    const [secret, setSecret] = useState("")

    /*const a = ["a", "b" , "c"]
    const b = ["a", 2, 3]

    const d = reject(a, (value)=>{
        const k = b.some((v) => v == value)
        return k
    })

    console.log(d)*/

    

    
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
            

            
                <h3>Open Orders</h3>

                <input placeholder="secret" value={secret} onChange={(e)=>setSecret(e.target.value)}/>

                <table>
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>Investor</th>
                            <th>Share Class</th>
                            <th>Amount</th>
                            <th>Price USDT</th>
                            
                        </tr>

                        
                        {

                        openOrders.map((order)=>{

                            return(
                                <tr key={order._swapID}>
                                    <td>{web3.utils.hexToUtf8(order._swapID)}</td>
                                    <td>{order._investor}</td>
                                    <td>{web3.utils.hexToUtf8(order._partition)}</td>
                                    <td>{token(order._amount)}</td>
                                    <td>{"$" + token(order._price)}</td>
                                    <td className={order.expired ? "expired" : "valid"}>{order.expired ? "expired" : "valid"}</td>
                                    <td>
                                        <button onClick={()=>withDrawPayment(order._swapID, secret, setSecret, htlc20Contract, web3, address, dispatch)}>WithDraw Payment</button>
                                    </td>
                                </tr>


                            )
                         })
                        }   


                        
                    </tbody>
                </table>

                
                
            
        </div>
    )

}


export default IssuerDashboard