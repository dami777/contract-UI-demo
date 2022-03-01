import React from 'react'
import "./asset.css"
import { Link } from 'react-router-dom'
const AssetCard = ({ name, text, buttonText, status, link }) => {
    console.log({ name, text, buttonText, status, link })
    console.log(83889393)
    return (
        <div className="card mb-5" style={{ width: "18rem", background: "yellow", width: "300px", marginBottom: "40px" }}>
            <div style={{ padding: "10px" }}>
                <div style={{ marginBottom: "20px" }}>
                    <h4>{name}</h4>
                    <p>{text}</p>
                </div>

                {status ? <Link className='asset-button' to={link}>{buttonText}</Link> : <p>coming soon</p>}
            </div>
        </div>
    )
}

export default AssetCard