import Web3 from "web3";
import { loadConnectedAddressAction, loadWeb3Action, loadAbiAction, 
    checkWalletConnectionAction, loadTokenNameAction, 
    loadTokenSymbolAction, loadTokenTotalSupplyAction, loadTotalBalance,
    loadTransferEventsAction, loadERC20AbiAction, loadHTLC1400AbiAction, loadHTLC20AbiAction,
    loadERC1400ContractAction, loadERC20ContractAction, loadHTLC1400ContractAction, loadHTLC20ContractAction,
    loadHTLC1400AddressAction, loadHTLC20AddressAction, loadIssuerOpenOrderEventsAction, loadIssuerClosedOrderEventsAction, loadInvestorOpenOrderEventsAction,
    loadInvestorClosedOrderEventsAction, loadInvestorFundedOrderEventsAction, loadIssuerClosedOrder, loadIssuerNewOrder, loadInvestorClosedOrder, loadInvestorNewOrder 
} from "./actions/action";
import { filterOutReason, tokensWei } from "./helpers";
import moment from "moment";
import { ethers } from "ethers"



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

    const ERC1400_JSON = require("./contractAbi/ERC1400.json")
    const ERC20_JSON = require("./contractAbi/ERC20.json")
    const HTLC20_JSON = require("./contractAbi/HTLC20.json")
    const HTLC1400_JSON = require("./contractAbi/HTLC1400.json")
     
    /*dispatch(loadAbiAction(ERC1400_JSON))
    dispatch(loadHTLC20AbiAction(HTLC20_JSON))
    dispatch(loadHTLC1400AbiAction(HTLC1400_JSON))
    dispatch(loadERC20AbiAction(ERC20_JSON))*/

    return {ERC1400_JSON, ERC20_JSON, HTLC1400_JSON, HTLC20_JSON}
}

export const checkWalletConnection = async(dispatch)=>{

    const { ethereum } = window 
    const accounts = await ethereum.request({method: 'eth_accounts'})
    
    if ( accounts.length > 0 ) {
        dispatch(checkWalletConnectionAction(true))
    }

}


export const loadContract=async(web3, dispatch)=>{
    const {ERC1400_JSON, ERC20_JSON, HTLC1400_JSON, HTLC20_JSON} = loadAbi()
    const networkID = await web3.eth.net.getId()


    
    const erc1400ContractAddress = ERC1400_JSON.networks[networkID].address     // get the contract address
    const erc20ContractAddress = ERC20_JSON.networks[networkID].address
    const htlc1400ContractAddress = HTLC1400_JSON.networks[networkID].address
    const htlc20ContractAddress = HTLC20_JSON.networks[networkID].address

    

    const erc1400contract = new web3.eth.Contract(ERC1400_JSON.abi, erc1400ContractAddress)
    const erc20contract = new web3.eth.Contract(ERC20_JSON.abi, erc20ContractAddress)
    const htlc20contract = new web3.eth.Contract(HTLC20_JSON.abi, htlc20ContractAddress)
    const htlc1400contract = new web3.eth.Contract(HTLC1400_JSON.abi, htlc1400ContractAddress)
    

    await loadOrderStates(htlc1400contract, htlc20contract, dispatch)
    
    dispatch(loadERC1400ContractAction(erc1400contract))
    dispatch(loadERC20ContractAction(erc20contract))
    dispatch(loadHTLC1400ContractAction(htlc1400contract))
    dispatch(loadHTLC20ContractAction(htlc20contract))
    dispatch(loadHTLC20AddressAction(htlc20ContractAddress))
    dispatch(loadHTLC1400AddressAction(htlc1400ContractAddress))

    const tokenName = await erc1400contract.methods.name().call()
    const totalSupply = await erc1400contract.methods.totalSupply().call()
    const symbol = await erc1400contract.methods.symbol().call()

    dispatch(loadTokenNameAction(tokenName))
    dispatch(loadTokenSymbolAction(symbol))
    dispatch(loadTokenTotalSupplyAction(totalSupply))

    
    

    return { erc1400contract, erc20contract, htlc20contract, htlc1400contract }
    
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


export const sign=async(data, signer)=>{

    console.log("okay")

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    console.log(web3)
    console.log(signer)
    const s = await web3.eth.getAccounts()
    console.log(s)

    web3.currentProvider.sendAsync(
        {
            method: "eth_signTypedData_v3",
            params: [],
            from: signer
        },

        function(err, result){
            if(err) {
                console.log(err)
            }

            else {
                console.log(result)
            }
        }
    )

    
}

export const openOrder=(web3, htlc1400Contract, htlc1400Address, htlc20Contract, erc1400Contract, orderID, issuerAddress, investorAddress, amount, price, htlc1400ExpirationDay, htlc20ExpirationDay, secret, className, dispatch)=>{

    const htlc20Expiration = new Date(moment().add(htlc20ExpirationDay, 'days').unix()).getTime()
    const htlc1400Expiration = new Date(moment().add(htlc1400ExpirationDay, 'days').unix()).getTime()
    const orderIDByte = web3.utils.asciiToHex(orderID)
    let secretByte = web3.utils.asciiToHex(secret)
    let dataHex = web3.eth.abi.encodeParameter("bytes32", secretByte)
    let secretHash = ethers.utils.sha256(dataHex)
    const fromIsWhiteListedOrIssuer = true
    const toIsWhiteListed = true
    const signature = "0x9292906193066a70b863da0861b6ea2e366074a455a4c5f6b1a79e7347734e4c72e3b654f028795e7eb8b7762a0be9b249484ac3586f809ba1bc072afe1713191b"
    const ethHash = "0xa420c3c01ff29855b5c7421b2a235747e80195ebea4a0eecde39229964686d97"
    const data =  web3.eth.abi.encodeParameters(["bytes", "bytes32", "bool", "bool"], [signature, ethHash, fromIsWhiteListedOrIssuer, toIsWhiteListed])
    const classByte = web3.utils.asciiToHex(className)
    
    htlc20Contract.methods.openOrder(orderIDByte, investorAddress, tokensWei(price), tokensWei(amount), htlc20Expiration, secretHash, secretByte, classByte).send({from: issuerAddress})
    .on (
        'receipt', (receipt)=> {
            dispatch(loadInvestorNewOrder(receipt.events.OpenedOrder.returnValues))
            erc1400Contract.methods.authorizeOperator(htlc1400Address).send({from: issuerAddress})
            .on("receipt", ()=>htlc1400Contract.methods.openOrder(orderIDByte, secretByte, secretHash, classByte, investorAddress, tokensWei(amount), htlc1400Expiration, data).send({from: issuerAddress})
            
            .on(
                "receipt", (receipt)=>{
                    dispatch(loadIssuerNewOrder(receipt.events.OpenedOrder.returnValues))
                    alert("order opened successfully")
                }
            ))     
            
        }
    )

}


export const setRegulatorOnChain=(erc1400Contract, regulator, setter)=>{

    erc1400Contract.methods.setController(regulator).send({from: setter})
    .on("receipt", ()=>alert("regulator set successfully"))
    .on (

        'error', (err)=>{
            
            const errMessage = filterOutReason(err)

            alert(errMessage)
        }
    )
}


export const getTransferTransactionDetails=async(contract, dispatch)=>{
    
    const transferStream = await contract.getPastEvents('Transfer', {fromBlock:0, toBlock:"latest"})
    const transfers = transferStream.map(event => event.returnValues)
    dispatch(loadTransferEventsAction(transfers))

    return transfers

}



export const loadOrderStates=async(htlc1400Contract, htlc20Contract, dispatch)=>{



    const issuerOpenedStream = await htlc1400Contract.getPastEvents('OpenedOrder', {fromBlock:0, toBlock:"latest"})
    const issuerClosedStream = await htlc1400Contract.getPastEvents('ClosedOrder', {fromBlock:0, toBlock:"latest"})

    const investorOpenedStream = await htlc20Contract.getPastEvents('OpenedOrder', {fromBlock:0, toBlock:"latest"})
    const investorClosedStream = await htlc20Contract.getPastEvents('ClosedOrder', {fromBlock:0, toBlock:"latest"})
    const investorFundedStream = await htlc20Contract.getPastEvents('Funded', {fromBlock:0, toBlock:"latest"})

    const issuerOpenedOrders = issuerOpenedStream.map(event => event.returnValues)
    const issuerClosedOrders = issuerClosedStream.map(event => event.returnValues)
    const investorOpenedOrders = investorOpenedStream.map(event => event.returnValues)
    const investorClosedOrders = investorClosedStream.map(event => event.returnValues)
    const investorFundedOrders = investorFundedStream.map(event => event.returnValues)
    

    dispatch(loadIssuerOpenOrderEventsAction(issuerOpenedOrders))
    dispatch(loadIssuerClosedOrderEventsAction(issuerClosedOrders))
    dispatch(loadInvestorOpenOrderEventsAction(investorOpenedOrders))
    dispatch(loadInvestorClosedOrderEventsAction(investorClosedOrders))
    dispatch(loadInvestorFundedOrderEventsAction(investorFundedOrders))

    
}


export const preprocessExpiredOrders=(orders)=>{

    const openOrders = orders.map((order)=>{
        if(new Date(moment().unix()).getTime() > Number(order._expiration)){
            return {...order, expired:true}
        } else {
            return {...order, expired:false}
        }
    })


    return openOrders
}

export const preprocessFundedOrders=async(orders, htlc20Contract)=>{

    const _orders = await Promise.all(

        orders.map(async(order)=>{
            let _order = await htlc20Contract.methods.checkOrder(order._swapID).call()
            const funded = _order._funded
    
            console.log(funded)
            return {...order, _funded:funded}
                                
        })

    )
    

    return _orders
}

export const releasePayment=(orderID, htlc20Contract, erc20Contract, price, htlc20Address, dispatch, investorAddress)=>{

    erc20Contract.methods.approve(htlc20Address, tokensWei(price)).send({from:investorAddress})
    .on("receipt", ()=>htlc20Contract.methods.fundOrder(orderID).send({from: investorAddress})
    
    .on("receipt", ()=>{
        alert("payment released for the order")
    })
    )

}


export const withDrawPayment=(orderID, secret, setSecret, htlc20Contract, web3, address, dispatch)=>{

    htlc20Contract.methods.issuerWithdrawal(orderID, web3.utils.asciiToHex(secret)).send({from:address})
    .on("receipt", (receipt)=>{
        alert("payment withdrawn")
        setSecret("")
        dispatch(loadInvestorClosedOrder(receipt.events.ClosedOrder.returnValues))
    })

    .on("error", (error)=>{
        const errMessage = filterOutReason(error)

        alert(errMessage)
    })

}

export const withDrawAsset=(orderID, secret, setSecret, htlc1400Contract, web3, address, dispatch)=>{

    htlc1400Contract.methods.recipientWithdrawal(orderID, web3.utils.asciiToHex(secret)).send({from:address})
    .on("receipt", (receipt)=>{   
        alert("security token withdrawn")
        setSecret("")
        dispatch(loadIssuerClosedOrder(receipt.events.ClosedOrder.returnValues))
    })

}

export const checkSecret=async(orderID, htlc20Contract, web3)=>{
    const order = await htlc20Contract.methods.checkOrder(orderID).call()
    const secret = order._secretKey
    alert(web3.utils.hexToUtf8(secret))
}




