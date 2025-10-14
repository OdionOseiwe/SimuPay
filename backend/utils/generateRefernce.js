import crypto from 'crypto'

export const generateRefernce = () =>{
    const prefix = "TXN";
    const randomToken = crypto.randomInt(10000, 99999);
    const timeStamp =  Date.now();
    return `${prefix}-${timeStamp}-${randomToken}`
}
