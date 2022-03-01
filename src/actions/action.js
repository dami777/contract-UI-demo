import axios from "axios"
// function to load web3 provider

export const loadWeb3Action = (web3) => {
    return ({
        type: "LOAD_WEB3",
        payload: web3
    })
}


// function to load connected address

export const loadConnectedAddressAction = (address) => {
    return ({
        type: "LOAD_ADDRESS",
        payload: address
    })
}

// function to load abi

export const loadAbiAction = (abi) => {
    return ({
        type: "LOAD_ABI",
        payload: abi
    })
}


// function to check wallet connection

export const checkWalletConnectionAction = (payload) => {
    return ({
        type: "CHECK_WALLET",
        payload: payload
    })
}

// function to load token name
export const loadTokenNameAction = (name) => {
    return ({
        type: "TOKEN_NAME",
        payload: name

    })
}

// function to load token symbol
export const updateInfoAction = (values, checkbox, prospect, imageAsFile) => {
    return ({
        type: "UPDATE_INFO",
        payload: { values, checkbox, prospect, imageAsFile }

    })
}

const uploadBackgroundImage = async (img) => {
    let formData = new FormData()
    if (img.name) {
        formData.append('file', img)
        formData.append("folder", "tangl")
        const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/fakorede29/upload";
        const CLOUDINARY_UPLOAD_PRESET = "lkj3irt3";
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        let image = await axios({
            url: CLOUDINARY_URL,
            method: "POST",
            data: formData,
        })
        const value = image.data.secure_url
        return value
    } else {
        return ""
    }
}
const uploadBackgroundFile = async (file) => {
    let formData = new FormData()
    const apiKey = "162341446754791"
    if (file.name) {
        formData.append('file', file)
        formData.append("folder", "tangl")
        formData.append('api_key', apiKey);

        const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/fakorede29/upload";
        const CLOUDINARY_UPLOAD_PRESET = "lkj3irt3";
        formData.append("upload_preset", "hvfw8on8");
        let image = await axios({
            url: CLOUDINARY_URL,
            method: "POST",
            data: formData,
        })
        const value = image.data.secure_url
        return value
    } else {
        return ""
    }

}

export const storeUserInfoOnDataBase = (data) => async dispatch => {
    const URL = "http://localhost:7000"
    console.log(data.values)
    const values = data.values
    const image = data.imageAsFile
    const prospect = data.prospect
    const checkbox = data.checkbox
    console.log({ values, image, prospect, checkbox })
    const dataValue = values.map(val => {
        return { name: val.name, value: val.value }
    })
    console.log({ dataValue })

    const uploadImageURL = image.name ? await uploadBackgroundImage(image) : ""
    // const uploadFileURL = await uploadBackgroundFile(prospect)
    const uploadFileURL = ""
    // console.log({ uploadImageURL })
    let newUser = await fetch(`${URL}/user/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataValue, imgURL: uploadImageURL, fileURL: uploadFileURL }),
    });
    let response = await newUser.json()
    if (response.id === "saved") {
        return ({
            type: "UPDATE_UI",
            payload: { message: "saved" }

        })
    }

}
export const loadTokenSymbolAction = (name) => {
    return ({
        type: "TOKEN_SYMBOL",
        payload: name
    })
}


// function to load token total supply
export const loadTokenTotalSupplyAction = (name) => {
    return ({
        type: "TOKEN_TOTAL_SUPPLY",
        payload: name

    })
}


// function to load contract
export const loadContractAction = (contract) => {
    return ({
        type: "LOAD_CONTRACT",
        payload: contract

    })
}


// function to load balances of a connected address
export const loadTotalBalance = (balance) => {
    return ({
        type: "LOAD_BALANCE",
        payload: balance
    })
}

// function to load transfer events
export const loadTransferEventsAction = (event) => {
    return ({
        type: "LOAD_TRANSFER_EVENTS",
        payload: event
    })
}