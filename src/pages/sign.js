import { sign } from "../functions"


const Sign = () => {

    let domain = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
        { name: "salt", type: "bytes32" }
    ]


    let identity = [
        { name: "_from", type: "address" },
        { name: "_to", type: "address" },
        { name: "_amount", type: "uint256" }
    ]


    let domainData = {
        name: "Dapp Name",
        version: "1",
        chainId: 5777,
        verifyingContract: "0x549f71200b5Ee3F3C04EF5A29e7c70d40E42ed83"
    }

    let message = {
        amount: 100,
        from: "Mr Tommy Shelby",
        to: "Miss Eda Shelby"
    }

    let data = JSON.stringify({
        types: {
            EIP712Domain: domain,
            Identity: identity
        },

        domain: domainData,
        primaryType: "Identity",
        message: message

    })

    let signer = "0x3b38b124019267a4A12505CBc9D81eD14461165A"

    return (
        <div>
            <button onClick={() => sign(data, signer)}>Authorize Transaction</button>


        </div>
    )

}

export default Sign