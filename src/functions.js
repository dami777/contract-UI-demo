import Web3 from "web3";

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
            params: [signer, data],
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
