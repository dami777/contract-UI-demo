import { useEffect, useState } from "react"
import { connectWallet, loadBalances } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { get } from "lodash"
import ConnectWallet from "../components/connectWallet"
import { token, tokensWei } from "../helpers"
import { transferToken, getTransferTransactionDetails, preprocessTransfer } from "../functions"




const InvestorDashboard=()=>{

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

    const transferEvents = useSelector(
        state => get(state, 'loadEventsReducer.tranferEvent', [])
    )

    const decoratedTransfer = preprocessTransfer(address, transferEvents)


    useEffect(()=>{
        if (Object.keys(contract).length > 0) {
            loadBalances(contract, address, dispatch)
            getTransferTransactionDetails(contract, dispatch)
        }
    })


    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('')

    
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

            <h2>Transactions</h2>
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
            </center>
        </div>
    )
}

export default InvestorDashboard