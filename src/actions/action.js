
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
        payload:address
    })
}