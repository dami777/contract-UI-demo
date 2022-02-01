
// function to load web3 provider

export const loadWeb3Action=(web3)=>{
    return ({
        type: "LOAD_WEB3",
        payload: web3
    })
}


// function to load connected address

export const loadConnectedAddressAction=(address)=>{
    return ({
        type: "LOAD_ADDRESS",
        payload: address
    })
}

// function to load abi

export const loadAbiAction=(abi)=>{
    return ({
        type: "LOAD_ABI",
        payload: abi
    })
}


// function to check wallet connection

export const checkWalletConnectionAction=(payload)=>{
    return ({
        type: "CHECK_WALLET",
        payload: payload
    })
}