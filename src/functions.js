import Web3 from "web3";
import { loadConnectedAddressAction, loadWeb3Action, loadAbiAction, 
    checkWalletConnectionAction, loadContractAction, loadTokenNameAction, 
    loadTokenSymbolAction, loadTokenTotalSupplyAction, loadTotalBalance,
    loadTransferEventsAction 
} from "./actions/action";
import { filterOutReason } from "./helpers";

export const loadWeb3=(dispatch)=>{

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    dispatch(loadWeb3Action(web3))
    return web3

}

export const loadAddress=async(dispatch, web3)=>{

    const address = await web3.eth.getAccounts()


    if ( address.length > 0 ) {
        dispatch(loadConnectedAddressAction(address[0]))
        return address[0]
    }

}

export const connectWallet=async(dispatch, web3)=>{
    const { ethereum } = window

    if(ethereum.isMetaMask) {
        console.log(ethereum)
        const connect = await ethereum.request({method: 'eth_requestAccounts'})
        
    }
    
    const accountFromWeb3 = await web3.eth.getAccounts()

    if (accountFromWeb3.length > 0) {
        dispatch(loadConnectedAddressAction(accountFromWeb3[0]))
        dispatch(checkWalletConnectionAction(true))
        return accountFromWeb3[0]
    }
}

export const loadAbi= (dispatch)=>{

    const tokenJson = require("./contractAbi/ERC1400.json")
    const abi = tokenJson
    dispatch(loadAbiAction(abi))
    return abi
}

export const checkWalletConnection = async(dispatch)=>{

    const { ethereum } = window 
    const accounts = await ethereum.request({method: 'eth_accounts'})
    
    if ( accounts.length > 0 ) {
        dispatch(checkWalletConnectionAction(true))
    }

}


export const loadContract=async(web3, dispatch)=>{
    const abi = loadAbi(dispatch)
    const networkID = await web3.eth.net.getId()
    const contractAddress = abi.networks[networkID].address     // get the contract address

    const contract = new web3.eth.Contract(abi.abi, contractAddress)
    
    
    dispatch(loadContractAction(contract))

    const tokenName = await contract.methods.name().call()
    const totalSupply = await contract.methods.totalSupply().call()
    const symbol = await contract.methods.symbol().call()

    dispatch(loadTokenNameAction(tokenName))
    dispatch(loadTokenSymbolAction(symbol))
    dispatch(loadTokenTotalSupplyAction(totalSupply))
    

    return contract
    
}

export const issueToken=(contract, dispatch, address, recipient, amount)=>{
    contract.methods.issueTokens(recipient, amount).send({from: address})
    .on ('receipt', ()=>{
        contract.methods.totalSupply().call().then(
            supply => dispatch(loadTokenTotalSupplyAction(supply))
        )

        alert('new tokens issued to', recipient)
    })

    
}


export const transferToken=(contract, dispatch, address, recipient, amount)=>{
    contract.methods.transfer(recipient, amount).send({from: address})
    .on ('receipt', ()=>{

         contract.methods.balanceOf(address).call().then(
            balance => dispatch(loadTotalBalance(balance))
        )

        alert('tokens transferred successfully', recipient)
    })

    .on (

        'error', (err)=>{
            
            const errMessage = filterOutReason(err)

            alert(errMessage)
        }
    )
    

    
}

export const addToWhiteList=(contract, whiteListAddress, sender)=>{

    contract.methods.addToWhiteList(whiteListAddress).send({from: sender})
    .on (
        'receipt', ()=> {
            alert('address added to whitelist')
        }
    )

}

export const loadBalances = (contract, address, dispatch)=>{

    
    contract.methods.balanceOf(address).call().then(
        balance => dispatch(loadTotalBalance(balance))
    )
}


export const getTransferTransactionDetails=async(contract, dispatch)=>{
    
    const transferStream = await contract.getPastEvents('Transfer', {fromBlock:0, toBlock:"latest"})
    const transfers = transferStream.map(event => event.returnValues)
    dispatch(loadTransferEventsAction(transfers))

}

export const preprocessTransfer=(tokenHolder, transferEvent)=>{
    transferEvent = transferEvent.map((event)=>{
        if (event._from === tokenHolder) {
            return {...event, type: "debit"}
        } else {
            return {...event, type: "credit"}
        }
    })

    return transferEvent
}
