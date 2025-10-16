import {Payment} from '../models/PaymentLink.model.js'
import { Wallet } from '../models/Wallet.model.js'
import dotenv from 'dotenv'
import crypto from 'crypto'
dotenv.config()

//create a payment link
// only logged in users can create a payment link
// a payment link is associated with a wallet
// the wallet is created when a user signs up
// the payment link also contains a unique reference that identifies the payment

export const createPaymentLink = async(req,res)=>{
        const {paymentName,  minimumAmountForPayment, paymentDescription} = req.body;
    try {
        if(!paymentName || !minimumAmountForPayment  || !paymentDescription){
            return res.status(400).json({success:false, msg:"empty fields"})
        }
        //generate payment link
        const paymentRef = crypto.randomBytes(16).toString("hex");
        const link = `${process.env.CLIENT_URL}/pay/${paymentRef}`;
        const wallet = await Wallet.findOne({userId: req.userId});
        if(!wallet){
            return res.status(400).json({success:false, msg:"wallet not found"})
        }
        const WalletId = wallet._id;

        const newPayment = new Payment({
            creatorId: req.userId,
            walletId:WalletId,
            paymentName,
            minimumAmountForPayment,
            paymentDescription,
            paymentLink: link,
            paymentRef
        })
        await newPayment.save();

        res.status(200).json({success:true, link:newPayment.paymentLink, msg:newPayment})

    } catch (error) {
        console.log("error creating payment link", error);
        res.status(500).json({success:false, msg:"internal server error"})   
    }
}

//get all payment links created by a user
export const getAllPaymentLinks = async(req, res)=>{
    try {
        const payment = await Payment.find({creatorId:req.userId});
        
        if (!payment) {
            res.status(404).json({ success: false, msg: "no payment link found" });
        }
        res.status(200).json({ success: true, msg: payment });
    } catch (error) {
        console.log("error querying payments links", error);
        res.status(500).json({success:false, msg:"internal server error"}) 
    }
}