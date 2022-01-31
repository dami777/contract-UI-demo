import { connectWallet } from "../functions"
import { useDispatch, useSelector } from "react-redux"
import { get } from "lodash"


const ConnectWallet=()=>{

    const dispatch = useDispatch()

    const { ethereum } = window

    console.log(ethereum)

    const web3 = useSelector(
        state => get(state, 'loadWeb3Reducer.web3', {})
      )

    return (
        <div className="connect-cont">
            <button className="connect-button" onClick={async()=> await connectWallet(dispatch, web3)}>
                Connect Wallet 
            </button>
        </div>
    )
}

export default ConnectWallet