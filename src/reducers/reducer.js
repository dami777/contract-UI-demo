import { combineReducers } from "redux";


const loadWeb3Reducer = (state={}, action) =>{
    switch (action.type) {
        case "LOAD_WEB3":
            return {...state, web3: action.payload}
        case "LOAD_ADDRESS":
            return {...state, address: action.payload}
        case "LOAD_ABI":
            return {...state, abi: action.payload}
        default:
            return state
    }
}


export const allReducers = combineReducers({
    
    loadWeb3Reducer

})