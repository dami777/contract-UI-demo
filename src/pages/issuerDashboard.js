const IssuerDashboard = () =>{

    return (
        <div>

            <div className="about-token">
                <div className="token-meta-data">
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