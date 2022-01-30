export const counter=()=>{
    return({
        type: "INCREMENT"
    })
}

export const loadWeb3=(web3)=>{
    return ({
        type: "LOAD_WEB3",
        payload: web3
    })
}