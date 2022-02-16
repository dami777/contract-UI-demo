import { sign } from "../functions"


const Sign=()=>{

    let domain = [
        {name: "name", type: "string"},
        {name: "version", type: "string"},
        {name: "chainId", type: "uint256"},
        {name: "verifyingContract", type: "address"},
        {name: "salt", type: "bytes32"}
    ]
    
    
    let identity = [
        {name: "_from", type: "string"},
        {name: "_to", type: "string"},
        {name: "_amount", type: "uint256"}
    ]
    
    
    let domainData = {
        name: "TANGL",
        version: "1",
        chainId: 4,
        verifyingContract: "0x549f71200b5Ee3F3C04EF5A29e7c70d40E42ed83"
    }
    
    let message = {
        
        _from: "Mr Thomas Shelby",
        _to: "Miss Eda Shelby",
        _amount: 100,
    }
    
    let data = JSON.stringify({
        types : {
            EIP712Domain: domain,
            Identity: identity
        },
    
        domain: domainData,
        primaryType: "Identity",
        message: message
    
    })
    
    let signer = "0xa3CfeF02b1D2ecB6aa51B133177Ee29764f25e31"

    return (
        <div>
            <button onClick={()=>sign(data, signer)}>Authorize Transaction</button>
        </div>
    )

}

export default Sign