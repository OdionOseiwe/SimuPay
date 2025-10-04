import {Transaction} from '../models/Transaction.model.js'
import { Wallet } from '../models/Wallet.model.js'
import {Payment} from '../models/PaymentLink.model.js'

// this is called when a user makes a payment using a payment link
// the payment link contains a unique reference that identifies the payment
// the payment link is created by a logged in user and is associated with their wallet
// when a user makes a payment using the link, a transaction is created
// the transaction contains the walletId of the user who created the link (receiverWalletId)
// the transaction also contains the amount paid, sender's name and email, and payment reference
// only Naira payments are allowed for now
// when a link is sent, the sender has to login or sign up to make payment and fund their wallet
// the wallet balance of the user who created the link is updated
// the total amount received for that payment link is also updated
// email notifications are sent to both the sender and receiver

export const payWithPaymentLink = async (req, res) => {
  try {
    const { fromEmail, from, amount } = req.body;
    const { paymentRef } = req.params;

    if (!fromEmail || !from || !amount || !paymentRef) {
      return res.status(400).json({
        success: false,
        msg: "Provide your name, email, amount, and payment reference"
      });
    }

    // Find the payment using the ref (not the full link)
    const payment = await Payment.findOne({ paymentRef });
    if (!payment) {
      return res.status(404).json({ success: false, msg: "No payment link found" });
    }

    const receiverWallet = await Wallet.findOne({ _id: payment.walletId });
    const senderWallet = await Wallet.findOne({ userId: req.userId });
    if(!senderWallet){
        return res.status(404).json({success:false, msg:"No wallet found for sender"})
    }
    if (!receiverWallet) {
      return res.status(404).json({ success: false, msg: "No wallet found for this payment link" });
    }

    // Check minimum payment requirement
    if (amount < payment.minimumAmountForPayment) {
      return res.status(400).json({
        success: false,
        msg: `Amount must be at least ${payment.minimumAmountForPayment}`
      });
    }

    if (senderWallet.balance < 0) {
      return res.status(400).json({ success: false, msg: "Insufficient balance in sender's wallet" });
    }

    // Create sender transaction
    const senderTransaction = new Transaction({
      receiverWalletId: payment.walletId,
      fromEmail,
      from,
      to: receiverWallet.userId,
      amount,
      paymentName: payment.paymentName,
      paymentRef,
      transactionType: "debit",
    });

      // Create receiver transaction
    const receiverTransaction = new Transaction({
      receiverWalletId: payment.walletId,
      fromEmail,
      from,
      to: receiverWallet.userId,
      amount,
      paymentName: payment.paymentName,
      paymentRef,
      transactionType: "credit",
    });

    // Deduct from sender wallet
    senderWallet.balance -= amount;
    await senderWallet.save();

    // Update wallet & payment totals
    receiverWallet.balance += amount;
    await receiverWallet.save();

    payment.totalAmount += amount;
    await payment.save();

    await senderTransaction.save();
    await receiverTransaction.save();

    // TODO: send email notifications here

    res.status(201).json({ success: true, txns:transaction });

  } catch (error) {
    console.error("Error during payment transaction:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

//get all transactions
export const getTransactions =async(req,res)=>{
    try {
        const txns = await Transaction.find();
        if(!txns){
            res.status(404).json({success:false, msg:"No transactions found"})
        }
        res.status(200).json({success:true, txns});
    } catch (error) {
        res.status(400).json({success:false, msg:"Error occured while fetching transactions"})
        console.log("error occured", error);
    }
}

//get transactions by user id -> loged in user
// TODO: a uniquue way of fecthing transactions by user id
export const getTransactionByUserId =async(req,res)=>{
    const userId = req.userId;
    const wallet = await Wallet.findOne({ userId:userId });
    if(!wallet){
        return res.status(404).json({success:false, msg:"No wallet found for this user"})
    }
    const receiverWalletId = wallet._id;
    // fetch transaction is not unique enough
    try {
        const txns = await Transaction.find({ receiverWalletId, transactionType: "" }).select("paymentName amount from senderEmail");
        if(!txns){
            res.status(404).json({success:false, msg:"No transactions found"})
        }
        res.status(200).json({success:true, txns});
    } catch (error) {
        res.status(400).json({success:false, msg:"Error occured while fetching transactions"})
        console.log("error occured", error);
    }
}

//get transactions by payment link
export const getTransactionPaymentLink = async(req,res) =>{
    const { paymentLink } = req.query;
    if(!paymentLink){
        return res.status(400).json({success:false, msg:"Provide payment link"})
    }
    try {
        const txns = await Transaction.find({ paymentLink }).select("paymentName amount from senderEmail");
        if(!txns){
            res.status(404).json({success:false, msg:"No transactions found"})
        }
        res.status(200).json({success:true, txns});
    } catch (error) {
        res.status(400).json({success:false, msg:"Error occured while fetching transactions"})
        console.log("error occured", error);
    }
}