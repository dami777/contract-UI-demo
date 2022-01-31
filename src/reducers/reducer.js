import { combineReducers } from "redux";


const counter=(state=0, action)=>{
    switch (action.type) {
        case "INCREMENT":
            return state += 1
        default:
            return state
    }
}

const loadWeb3Reducer= (state={}, action) =>{
    switch (action.type) {
        case "LOAD_WEB3":
            return {...state, web3: action.payload}
        case "LOAD_ADDRESS":
            return {...state, address: action.payload}
        default:
            return state
    }
}


export const allReducers = combineReducers({
    counter,
    loadWeb3Reducer
})