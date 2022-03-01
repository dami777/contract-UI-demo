import React from 'react'
import AssetTypes from "../components/AssetTypes"
const NewAsset = () => {
    const assetTypes = [
        {
            name: "Closed end fund",
            text: " closed end fund is owokoenen jeijoeoeko ejeojeoeo eooeoeoeoeooe",
            buttonText: "Create a closed end fund",
            status: true,
            link: "/new/closed"
        },
        {
            name: "Commodity",
            text: " commodity is owokoenen jeijoeoeko ejeojeoeo eooeoeoeoeooe",
            buttonText: "Create a commodity",
            status: true,
            link: "/new/commodity"
        },
        {
            name: "Bond",
            status: false
        },
    ]

    return (
        <div>
            <h3>Select Asset type</h3>

            {assetTypes.map((types, index) =>
                <AssetTypes
                    key={index}
                    {...types} />
            )

            }

        </div>
    )
}

export default NewAsset