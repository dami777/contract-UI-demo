import Web3 from "web3";

export const loadWeb3=(dispatch)=>{

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    dispatch(web3)
    return web3

}