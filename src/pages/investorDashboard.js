import { useState } from "react"
import { connectWallet } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { get } from "lodash"
import ConnectWallet from "../components/connectWallet"




const InvestorDashboard=()=>{

    const dispatch = useDispatch()

    const address = useSelector(
        state => get(state, 'loadWeb3Reducer.address', '')
    )

    
    return (
        <div>
            <ConnectWallet />
            <h3>Wallet ID: {address}</h3>
            <h3>Balance:</h3>
            <h2>Transactions</h2>
            <center>         
                <table>
                    <th>
                        <td>from</td>
                        <td>to</td>
                        <td>amount</td>
                    </th>
                </table>
            </center>
        </div>
    )
}

export default InvestorDashboard