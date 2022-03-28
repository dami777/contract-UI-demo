import { combineReducers } from "redux";


const loadWeb3Reducer = (state={}, action) =>{

    switch (action.type) {
        case "LOAD_WEB3":
            return {...state, web3: action.payload}
        case "LOAD_ADDRESS":
            return {...state, address: action.payload}
        case "LOAD_HTLC1400_ADDRESS":
            return {...state, htlc1400Address: action.payload}
        case "LOAD_HTLC20_ADDRESS":
            return {...state, htlc20Address: action.payload}
        case "LOAD_ABI":
            return {...state, abi: action.payload}
        case "LOAD_HTLC20_ABI":
            return {...state, htlc20: action.payload}
        case "LOAD_HTLC1400_ABI":
            return {...state, htlc1400: action.payload}
        case "LOAD_ERC20_ABI":
            return {...state, erc20: action.payload}
        case "LOAD_ERC1400_CONTRACT":
            return {...state, erc1400contract: action.payload}
        case "LOAD_ERC20_CONTRACT":
            return {...state, erc20contract: action.payload}
        case "LOAD_HTLC1400_CONTRACT":
            return {...state, htlc1400contract: action.payload}
        case "LOAD_HTLC20_CONTRACT":
            return {...state, htlc20contract: action.payload}
        default:
            return state
    }
}

const checkWalletConnectionReducer = (state=false, action) =>{
    switch (action.type) {
        case "CHECK_WALLET":
            return state = true 
        default:
            return state

    }
}


const loadTokenDataReducer=(state={}, action)=>{
    switch (action.type) {
        case "TOKEN_NAME":
            return {...state, name: action.payload}
        case "TOKEN_TOTAL_SUPPLY":
            return {...state, totalSupply: action.payload}
        case "TOKEN_SYMBOL":
            return {...state, symbol: action.payload}
        default:
            return state
    }
}

const loadBalancesReducer=(state={}, action)=>{
    switch (action.type) {
        case "LOAD_BALANCE":
            return {...state, totalBalance: action.payload}
        default:
            return state
    }
}

const loadEventsReducer=(state={}, action)=>{
    switch (action.type) {
        case "LOAD_TRANSFER_EVENTS":
            return {...state, tranferEvent: action.payload}
        case "LOAD_ISSUER_OPENED_ORDER_EVENTS":
            return {...state, issuerOpenedEvent: action.payload}

        case "LOAD_NEW_ISSUER_OPENED_ORDER_EVENT":
            return {...state, issuerOpenedEvent: [...state.issuerOpenedEvent, action.payload]}

        case "LOAD_ISSUER_CLOSED_ORDER_EVENTS":
            return {...state, issuerClosedEvent: action.payload}
        
        case "LOAD_NEW_ISSUER_CLOSED_ORDER_EVENT":
            return {...state, issuerClosedEvent: [...state.issuerClosedEvent, action.payload]}

        case "LOAD_INVESTOR_OPENED_ORDER_EVENTS":
            return {...state, investorOpenedEvent: action.payload}
        case "LOAD_NEW_INVESTOR_OPENED_ORDER_EVENT":
            return {...state, investorOpenedEvent: [...state.investorOpenedEvent, action.payload]}

        case "LOAD_INVESTOR_CLOSED_ORDER_EVENTS":
            return {...state, investorClosedEvent: action.payload}

        case "LOAD_NEW_INVESTOR_CLOSED_ORDER_EVENT":
            return {...state, issuerClosedEvent: [...state.investorClosedEvent, action.payload]}

        case "LOAD_INVESTOR_FUNDED_ORDER_EVENTS":
            return {...state, investorFundedEvent: action.payload}
        default:
            return state
    }
}

export const allReducers = combineReducers({
    
    loadWeb3Reducer,
    checkWalletConnectionReducer,
    loadTokenDataReducer,
    loadBalancesReducer,
    loadEventsReducer
    

})