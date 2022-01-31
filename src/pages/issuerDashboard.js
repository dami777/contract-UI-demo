import ConnectWallet from "../components/connectWallet"
import { useSelector } from "react-redux"
import { get } from "lodash"

const IssuerDashboard = () =>{

    const address = useSelector(
        state => get(state, 'loadWeb3Reducer.address', '')
      )

    return (
        <div>


            <ConnectWallet />
            <div className="about-token">
                <div className="token-meta-data">
                    <p>{address}</p>
                    <p>Token Name</p>
                    <p>Symbol</p>
                </div>

                <div className="total-supply">
                    <p>Total Supply</p>
                </div>
            </div>

            <div className="issuance">
                    <div>
                        <input type="text" placeholder="address"/>
                        <input type="text" placeholder="1000"/>
                        <button className="issue-token">issue</button>
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