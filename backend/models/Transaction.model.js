import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    senderWalletId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Wallet",   // tells Mongoose this field references the Wallet model , users will pay to this walletid
        required: true 
    },
    senderEmail:String,
    senderName:String,
    amount:Number,
    currency:String,
    paymentName:String,
    paymentLink:String, //Link to the project the sender is paying for 

})

export const Transaction = mongoose.model('TransactionSchema', TransactionSchema);
