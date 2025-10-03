import {Payment} from '../models/PaymentLink.model.js'
import { Wallet } from '../models/Wallet.model.js'
import dotenv from 'dotenv'
import crypto from 'crypto'
dotenv.config()

export const createPaymentLink = async(req,res)=>{
        const {paymentName, totalAmount, minimumAmountForPayment,currency, paymentDescription} = req.body;
    try {
        if(!paymentName || !minimumAmountForPayment || !currency || !paymentDescription){
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
            totalAmount,
            minimumAmountForPayment,
            currency,
            paymentDescription,
            paymentLink: link
        })
        await newPayment.save();

        res.status(200).json({success:true, link:newPayment.paymentLink, msg:newPayment})

    } catch (error) {
        console.log("error creating payment link", error);
        res.status(500).json({success:false, msg:"internal server error"})   
    }
}

export const getAllPaymentLinks = async(req, res)=>{
    try {
        const payment = await Payment.find({userId:req.userId});
        if (!payment) {
            res.status(404).json({ success: false, msg: "no payment link found" });
        }
        res.status(200).json({ success: true, payment });
    } catch (error) {
        console.log("error querying payments links", error);
        res.status(500).json({success:false, msg:"internal server error"}) 
    }
}