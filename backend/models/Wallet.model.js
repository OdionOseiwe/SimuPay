import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",   // tells Mongoose this field references the User model
        required: true 
    },
    balance:Number,

})

export const Wallet = mongoose.model('Wallet', WalletSchema);
