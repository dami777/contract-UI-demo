import { combineReducers } from "redux";

const initialState = {
    values: [],
    imageAsFile: {},
    prospect: {},
    checkbox: [],
    message: ""
}

const loadWeb3Reducer = (state = {}, action) => {
    switch (action.type) {
        case "LOAD_WEB3":
            return { ...state, web3: action.payload }
        case "LOAD_ADDRESS":
            return { ...state, address: action.payload }
        case "LOAD_ABI":
            return { ...state, abi: action.payload }
        case "LOAD_CONTRACT":
            return { ...state, contract: action.payload }
        default:
            return state
    }
}

const checkWalletConnectionReducer = (state = false, action) => {
    switch (action.type) {
        case "CHECK_WALLET":
            return state = true
        default:
            return state

    }
}


const loadTokenDataReducer = (state = {}, action) => {
    switch (action.type) {
        case "TOKEN_NAME":
            return { ...state, name: action.payload }
        case "TOKEN_TOTAL_SUPPLY":
            return { ...state, totalSupply: action.payload }
        case "TOKEN_SYMBOL":
            return { ...state, symbol: action.payload }
        default:
            return state
    }
}

const loadBalancesReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOAD_BALANCE":
            return { ...state, totalBalance: action.payload }
        default:
            return state
    }
}

const loadEventsReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOAD_TRANSFER_EVENTS":
            return { ...state, tranferEvent: action.payload }
        default:
            return state
    }
}

const inputReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_INFO":
            console.log(action)
            return { ...state, values: action.payload.values, imageAsFile: action.payload.imageAsFile, prospect: action.payload.prospect, checkbox: action.payload.checkbox }
        case "UPDATE_UI":
            console.log(action)
            return { ...state, message: "created a new user" }
        default:
            return state
    }
}

export const allReducers = combineReducers({

    loadWeb3Reducer,
    checkWalletConnectionReducer,
    loadTokenDataReducer,
    loadBalancesReducer,
    loadEventsReducer,
    inputReducer

})