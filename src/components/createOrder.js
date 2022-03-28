import { useState } from "react"
import { openOrder } from "../functions"
import { useSelector, useDispatch } from "react-redux"
import { get } from "lodash"

const CreateOrder=()=>{

        const [price, setPrice] = useState("")
        const [id, setID] = useState("")
        const [investor, setInvestor] = useState("")
        const [investorExpiration, setInvestorExpiration] = useState("")
        const [issuerExpiration, setIssuerExpiration] = useState("")
        const [secret, setSecret] = useState("")
        const [partition, setPartition] = useState("")
        const [amount, setAmount] = useState("")


        const dispatch = useDispatch()

        const erc1400contract = useSelector(
            state => get(state, 'loadWeb3Reducer.erc1400contract', {})
        )

        const web3 = useSelector(
            state => get(state, 'loadWeb3Reducer.web3', {})
        )

        const htlc1400contract = useSelector(
            state => get(state, 'loadWeb3Reducer.htlc1400contract', {})
        )


        const htlc20contract = useSelector(
            state => get(state, 'loadWeb3Reducer.htlc20contract', {})
        )


        const address = useSelector(
            state => get(state, 'loadWeb3Reducer.address', '')
        )


        const htlc1400Address = useSelector(
            state => get(state, 'loadWeb3Reducer.htlc1400Address', '')
        )
    



        return(
            <div>
                <input placeholder="order ID" value={id} onChange={(e)=>setID(e.target.value)}/>
                <div>
                    <input placeholder="amount" value={amount} onChange={(e)=>{
                        setAmount(e.target.value)
                        setPrice(e.target.value * 40)
                        }}/>
                    <p>price:<b>USDT {price}</b></p>
                </div>
                <input placeholder="partition" value={partition} onChange={(e)=>setPartition(e.target.value)}/>
                <input placeholder="investor address" value={investor} onChange={(e)=>setInvestor(e.target.value)}/>
                <input placeholder="withdraw token expiration day" value={investorExpiration} onChange={(e)=>setInvestorExpiration(e.target.value)}/>
                <input placeholder="withdraw payment expiration" value={issuerExpiration} onChange={(e)=>setIssuerExpiration(e.target.value)}/>
                    <input placeholder="secret" value={secret} onChange={(e)=>setSecret(e.target.value)}/>
                {/*<p>{secretHash}</p> */}

                <button onClick={()=>openOrder(web3, htlc1400contract, htlc1400Address, htlc20contract, erc1400contract, id, address, investor, amount, price, issuerExpiration, investorExpiration, secret, partition, dispatch)}>create order</button>
                   
            </div>
        )

}

export default CreateOrder