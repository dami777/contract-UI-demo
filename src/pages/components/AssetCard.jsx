import React from 'react'
import "./asset.css"
import { Link } from 'react-router-dom'
const AssetCard = ({ img, status, symbol, aum }) => {
    console.log({ img, status, symbol, aum })
    console.log(83889393)
    return (
        <div className="card mb-5" style={{ width: "18rem", background: "yellow", width: "300px", marginBottom: "40px" }}>
            <img className="card-img-top" src={`./assets/${img}.jpg`} alt="Card image cap" style={{ width: "300px" }} />
            <div style={{ padding: "10px" }}>
                <div style={{ marginBottom: "20px" }}>
                    <div className="asset-flex">
                        <div>Status</div>
                        <div style={{ color: "green" }}>{status ? "deployed" : "not deployed"}</div>
                    </div>
                    <div className="asset-flex">
                        <div>Symbol</div>
                        <div style={{ color: "green" }}>{symbol}</div>
                    </div>
                    <div className="asset-flex">
                        <div>AuM</div>
                        <div style={{ color: "green" }}>${aum}</div>
                    </div>
                </div>

                <button className='asset-button'>View Asset</button>
            </div>
        </div>
    )
}

export default AssetCard