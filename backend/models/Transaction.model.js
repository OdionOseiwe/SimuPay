import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",   // tells Mongoose this field references the User model
        required: true 
    },
    walletId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Wallet",   // tells Mongoose this field references the Wallet model
        required: true 
    },
    SenderEmail:String,
    senderName:String,
    Amount:Number,
    currency:String,
    paymentName:String,
    PaymentLink:String, //Link to the project the sender is paying for 

})

export const Transaction = mongoose.model('TransactionSchema', TransactionSchema);
