import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    receiverWalletId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Wallet",   // tells Mongoose this field references the Wallet model , users will pay to this walletid
        required: true 
    },
    fromEmail:String,
    from:String,
    to:String,
    amount:Number,
    paymentName:String,
    paymentRef:String, // unique reference for the payment link
    reference:String, // unique reference for the transaction
    transactionType:{
        type:String,
        enum:["credit","debit"],
        default:"credit" // credit means money coming in, debit means money going out
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

export const Transaction = mongoose.model('Transaction', TransactionSchema);
