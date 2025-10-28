import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",   // tells Mongoose this field references the User model
        required: true 
    },
    walletId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Wallet",   // tells Mongoose this field references the Wallet model , users will pay to this walletid
        required: true 
    },
    paymentName:{
        type:String,
        required:true
    },
    minimumAmountForPayment:{
        type:String,
        required:true
    },
    paymentDescription:{
        type:String,
        required:true
    },
    paymentLink:{
        type:String,
        required:true
    },
    paymentRef:String, // unique reference for the payment link
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Payment = mongoose.model('Payment', paymentSchema);
