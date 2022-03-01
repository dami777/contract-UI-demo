import React from 'react'
import AssetCard from '../components/AssetCard'
import { Link } from 'react-router-dom'
const assets = () => {
    const assetFactory = [
        {
            id: "0200",
            img: "img1",
            status: true,
            symbol: "BNB",
            aum: "1700993.39"
        },
        {
            id: "0220",
            img: "img1",
            status: true,
            symbol: "BNB",
            aum: "1700993.39"
        },
        {
            id: "0204",
            img: "img1",
            status: true,
            symbol: "BNB",
            aum: "1700993.39"
        },
    ]
    console.log(assetFactory)

    return (
        <div className="p-3 w-60 mx-auto" >
            <div className="asset-header">
                <h2>Select asset type</h2>
                <button className="new_asset"><Link to="/new/asset">Create new asset</Link></button>
            </div>
            {/* <p>Select the type of asset to create</p> */}
            {assetFactory.map(asset => {
                return (
                    <AssetCard
                        key={asset.id}
                        {...asset}
                    />
                )

            })}

        </div>
    )
}

export default assets