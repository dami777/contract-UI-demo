export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

export const DECIMALS = (10**18)

export const ether =(wei)=>{
    if(wei) {
        return (wei / DECIMALS)
    }
}

export const token = ether