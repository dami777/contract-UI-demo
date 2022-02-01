import { useState } from "react"
import { connectWallet, loadBalances } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { get } from "lodash"
import ConnectWallet from "../components/connectWallet"
import { checkWalletConnectionAction } from "../actions/action"
import { token } from "../helpers"




const InvestorDashboard=()=>{

    const dispatch = useDispatch()

    const address = useSelector(
        state => get(state, 'loadWeb3Reducer.address', '')
    )

    const totalBalance = useSelector(
        state => get(state, 'loadBalancesReducer.totalBalance', '')
    )

    const contract = useSelector(
        state => get(state, 'loadWeb3Reducer.contract', {})
    )

    const checkContractEmptiness = Object.keys(contract)

    if (checkContractEmptiness.length > 0) {
        loadBalances(contract, address, dispatch)
    }

    
    return (
        <div>
            <ConnectWallet />
            <h3>Wallet ID: {address}</h3>
            <h3>Balance: {token(totalBalance)}</h3>
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