import { useEffect, useState } from "react"
import { connectWallet, loadBalances } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { get, reject } from "lodash"
import ConnectWallet from "../components/connectWallet"
import { token, tokensWei } from "../helpers"
import { transferToken, getTransferTransactionDetails, preprocessTransfer, preprocessExpiredOrders, releasePayment, withDrawAsset, checkSecret } from "../functions"




const InvestorDashboard=()=>{


    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('')
    const [secret, setSecret] = useState("")

    const dispatch = useDispatch()

    const address = useSelector(
        state => get(state, 'loadWeb3Reducer.address', '')
    )

    const totalBalance = useSelector(
        state => get(state, 'loadBalancesReducer.totalBalance', '')
    )

    const contract = useSelector(
        state => get(state, 'loadWeb3Reducer.erc1400contract', {})
    )

    const createdOrder = useSelector(
        state => get(state, 'loadEventsReducer.investorOpenedEvent', [])
    )

    const closedOrders = useSelector(
        state => get(state, 'loadEventsReducer.issuerClosedEvent', [])
    )

    const fundedOrders = useSelector(
        state => get(state, 'loadEventsReducer.investorFundedEvent', [])
    )

    const web3 = useSelector(
        state => get(state, 'loadWeb3Reducer.web3', {})
    )

    const htlc20Contract = useSelector(
        state => get(state, 'loadWeb3Reducer.htlc20contract', {})
    )

    const htlc1400Contract = useSelector(
        state => get(state, 'loadWeb3Reducer.htlc1400contract', {})
    )


    const erc20contract = useSelector(
        state => get(state, 'loadWeb3Reducer.erc20contract', {})
    )

    const htlc20Address = useSelector(
        state => get(state, 'loadWeb3Reducer.htlc20Address', '')
    ) 


    const _preprocessExpiredOrders = preprocessExpiredOrders(createdOrder)

    const openOrders = reject(_preprocessExpiredOrders, (order)=>{

        const _closed = closedOrders.some((closedOrder)=>closedOrder._swapID == order._swapID)
        //const _funded = fundedOrders.some((fundedOrder)=>fundedOrder._swapID == order._swapID)

        return _closed

    })

    console.log(address)
    console.log(createdOrder)
    console.log(openOrders)
    console.log(contract)

   
    
    return (
        <div>
            <ConnectWallet />
            <h3>Wallet ID: {address}</h3>
            <h3>Balance: {token(totalBalance)}</h3>

            <h1>Transfer Fund</h1>

                <div>
                    <input type="text" placeholder="address" value={recipient} onChange={(e)=>setRecipient(e.target.value)}/>
                    <input type="text" placeholder="1000" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                    <button onClick={()=>transferToken(contract, dispatch, address, recipient, tokensWei(amount))}
                        className="issue-token">send</button>
                </div>

            {/*<h2>Transactions</h2>
            <center>         
                <table>
                    <thead>
                        <tr>
                            <th>from</th>
                            <th>to</th>
                            <th>amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {

                            //Object.keys(transferEvents).length > 0 && 

                            decoratedTransfer.map((event, index)=>{

                                return(
                                    <tr key={index}>
                                        <td>{event._from}</td>
                                        <td>{event._to}</td>
                                        <td>{event.type === "credit" ? "+" + token(event._amount) : "-" + token(event._amount)}</td>
                                    </tr>
                                )
                                
                            })
                        }
                        
                    </tbody>
                    
                </table>
                    </center>*/}

<input placeholder="secret" value={secret} onChange={(e)=>setSecret(e.target.value)}/>



<table>
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>Share Class</th>
                            <th>Amount</th>
                            <th>Price USDT</th>
                            
                        </tr>

                        
                        {

                        openOrders.map((order)=>{

                            return(
                                <tr key={order._swapID}>
                                   
                                   <td>{web3.utils.hexToUtf8(order._swapID)}</td>
                                    <td>{web3.utils.hexToUtf8(order._partition)}</td>
                                    <td>{token(order._amount)}</td>
                                    <td>{"$" + token(order._price)}</td>
                                    <td className={order.expired ? "expired" : "valid"}>{order.expired ? "expired" : "valid"}</td>
                                    <td>
                                       <button onClick={()=>releasePayment(order._swapID, htlc20Contract,  erc20contract, order._price, htlc20Address, dispatch, address)}>Release Payment</button>
                                    </td>
                                    <td>
                                        <button onClick={()=>checkSecret(order._swapID, htlc20Contract, web3)}>check secret</button>
                                    </td>

                                    <td>
                                        <button onClick={()=>withDrawAsset(order._swapID, secret, setSecret, htlc1400Contract, web3, address, dispatch)}>withdraw asset</button>
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

export default InvestorDashboard