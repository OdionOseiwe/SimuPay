import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    BusinessName:{
        type:String,
        required:true
    },
    isverified:{
        type:Boolean
    },
    verificationToken:Number,
    verificationTokenExpireAt: Date,
})

export const User = mongoose.model('User', userSchema);
