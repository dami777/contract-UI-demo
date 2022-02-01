
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

// function to load token name
export const loadTokenNameAction=(name)=>{
    return ({
        type: "TOKEN_NAME",
        payload: name

    })
}

// function to load token symbol
export const loadTokenSymbolAction=(name)=>{
    return ({
        type: "TOKEN_SYMBOL",
        payload: name

    })
}


// function to load token total supply
export const loadTokenTotalSupplyAction=(name)=>{
    return ({
        type: "TOKEN_TOTAL_SUPPLY",
        payload: name

    })
}


// function to load contract
export const loadContractAction=(contract)=>{
    return ({
        type: "LOAD_CONTRACT",
        payload: contract

    })
}


// function to load balances of a connected address
export const loadTotalBalance =(balance)=>{
    return ({
        type: "LOAD_BALANCE",
        payload: balance
    })
}