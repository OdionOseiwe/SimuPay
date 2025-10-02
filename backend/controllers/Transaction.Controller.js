import {Transaction} from '../models/Transaction.model.js'
import { Wallet } from '../models/Wallet.model.js'
import {Payment} from '../models/PaymentLink.model.js'

export const createTransaction = async(req, res)=>{
    try {
        const {senderEmail, senderName, amount, currency, paymentLink} = req.body;
        if (!senderEmail || !senderName || !amount) {
            res.status(200).json({
                success:false, msg:"Provide your name, email, amount"
            });
        }

        const payment = await Payment.findOne({paymentLink});
        const walletId = payment.walletId;
        const wallet = await Wallet.findById({id:walletId});

        if (!payment) {
            res.status(404).json({success:false, msg:"No payment associated with this link"})
        }
        if(amount < payment.minimumAmountForPayment){
            res.status(400).json({success:false, msg:"amount is less than required amount"})
        }

        const transaction = new Transaction({
            senderWalletId: walletId,
            senderEmail: senderEmail,
            senderName,
            amount: amount,
            currency,
            paymentName: payment.name,
            paymentLink: paymentLink
        });
        wallet.balance+=amount;
        await wallet.save();

        //send email notification to receiver

        payment.totalAmount+= amount;
        await payment.save();

        await transaction.save();

        //send email notification to sender

        res.status(200).json({success:true, msg:transaction})
    }catch (error) {
        res.status(400).json({success:false, msg:"Error occured during payment"})
        console.log("error occured", error);
    }
}

export const getTransactionByUserId =async(req,res)=>{
    const userId = req.userId;
    try {
        const txns = await Transaction.find({ userId }).select("paymentName amount senderName senderEmail");
        

    } catch (error) {
        
    }
}