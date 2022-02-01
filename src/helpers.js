export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

export const DECIMALS = (10**18)

export const ether =(wei)=>{
    if(wei) {
        return (wei / DECIMALS)
    }
}

export const token = ether

export const filterOutReason=(err)=>{
    var errorMessageInJson = JSON.parse(
        err.message.slice(58, err.message.length - 2)
      );

      var errorMessageToShow = errorMessageInJson.data.data[Object.keys(errorMessageInJson.data.data)[0]].reason;

      return errorMessageToShow
}