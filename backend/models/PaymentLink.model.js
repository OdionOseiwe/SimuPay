import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",   // tells Mongoose this field references the User model
        required: true 
    },
    walletId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Wallet",   // tells Mongoose this field references the Wallet model , users will pay to this walletid
        required: true 
    },
    projectName:{
        type:String,
        required:true
    },
    projectAmount:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    projectDescription:{
        type:String,
        required:true
    },
    projectLink:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Payment = mongoose.model('ProjectSchema', ProjectSchema);
