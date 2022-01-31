export const counter=()=>{
    return({
        type: "INCREMENT"
    })
}

export const loadWeb3Action=(web3)=>{
    return ({
        type: "LOAD_WEB3",
        payload: web3
    })
}