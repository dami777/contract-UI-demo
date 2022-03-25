
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



export const loadHTLC1400AddressAction=(address)=>{
    return ({
        type: "LOAD_HTLC1400_ADDRESS",
        payload: address
    })
}


export const loadHTLC20AddressAction=(address)=>{
    return ({
        type: "LOAD_HTLC20_ADDRESS",
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


export const loadHTLC20AbiAction=(abi)=>{
    return ({
        type: "LOAD_HTLC20_ABI",
        payload: abi
    })
}


export const loadHTLC1400AbiAction=(abi)=>{
    return ({
        type: "LOAD_HTLC1400_ABI",
        payload: abi
    })
}


export const loadERC20AbiAction=(abi)=>{
    return ({
        type: "LOAD_ERC20_ABI",
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
export const loadERC1400ContractAction=(contract)=>{
    return ({
        type: "LOAD_ERC1400_CONTRACT",
        payload: contract

    })
}


export const loadERC20ContractAction=(contract)=>{
    return ({
        type: "LOAD_ERC20_CONTRACT",
        payload: contract

    })
}

export const loadHTLC1400ContractAction=(contract)=>{
    return ({
        type: "LOAD_HTLC1400_CONTRACT",
        payload: contract

    })
}

export const loadHTLC20ContractAction=(contract)=>{
    return ({
        type: "LOAD_HTLC20_CONTRACT",
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

// function to load transfer events
export const loadTransferEventsAction = (event) =>{
    return ({
        type: "LOAD_TRANSFER_EVENTS",
        payload: event
    })
}



export const loadIssuerOpenOrderEventsAction = (event) =>{
    return ({
        type: "LOAD_ISSUER_OPENED_ORDER_EVENTS",
        payload: event
    })
}

export const loadIssuerClosedOrderEventsAction = (event) =>{
    return ({
        type: "LOAD_ISSUER_CLOSED_ORDER_EVENTS",
        payload: event
    })
}

export const loadInvestorOpenOrderEventsAction = (event) =>{
    return ({
        type: "LOAD_INVESTOR_OPENED_ORDER_EVENTS",
        payload: event
    })
}


export const loadInvestorClosedOrderEventsAction = (event) =>{
    return ({
        type: "LOAD_INVESTOR_CLOSED_ORDER_EVENTS",
        payload: event
    })
}


export const loadInvestorFundedOrderEventsAction = (event) =>{
    return ({
        type: "LOAD_INVESTOR_FUNDED_ORDER_EVENTS",
        payload: event
    })
}

