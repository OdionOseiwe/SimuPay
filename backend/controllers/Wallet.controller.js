import { Wallet } from "../models/Wallet.model.js";
import { Transaction } from "../models/Transaction.model.js";
import {User} from '../models/User.model.js'
import { generateRefernce } from "../utils/generateRefernce.js";

export const mockMoney = async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ success: false, msg: "invalid amount" });
  }

  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      return res.status(404).json({ success: false, msg: "wallet not found" });
    }
    wallet.balance += amount;
    await wallet.save();
    
    res.status(200).json({ success: true, balance: wallet.balance });  
  } catch (error) {
    console.log("error mocking money", error);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
};  

// transfer money to wallet using business name Or user name as identifier
export const transferToWallet = async (req, res) => {
  const { amount, userName } = req.body;

    if (!userName) {
      return res
        .status(400)
        .json({ success: false, msg: "userName is required" });
    }
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, msg: "invalid amount" });
    }
    try {
        let receiver = await User.findOne({ BusinessName: userName });
        let sender = await User.findOne({ _id: req.userId });
        if (!receiver) {
          return res
            .status(404)
            .json({ success: false, msg: "receiver not found" });
        }
        let receiverWallet = await Wallet.findOne({ userId: receiver._id });
        let senderWallet = await Wallet.findOne({ userId: req.userId });
        let reference = generateRefernce();
        if (!receiverWallet) {
          return res
            .status(404)
            .json({ success: false, msg: "receiver wallet not found" });
        }
        if (!senderWallet) {
          return res
            .status(404)
            .json({ success: false, msg: "sender wallet not found" });
        }
        if (senderWallet.balance < amount) {
          return res
            .status(400)
            .json({ success: false, msg: "insufficient balance" });
        }

        // deduct from sender wallet
        senderWallet.balance -= amount;
        await senderWallet.save();

        // update receiver balance
        receiverWallet.balance += amount;
        await receiverWallet.save();

        // create transaction for sender
        const senderTransaction = new Transaction({
            from: sender.BusinessName,
            to: receiver.BusinessName,
            amount,
            paymentName: "Transfer to wallet",
            paymentRef: "N/A",
            transactionType: "debit",
            reference
        });
        await senderTransaction.save();

        // create transaction for receiver
        const receiverTransaction = new Transaction({
            from: sender.BusinessName,
            to: receiver.BusinessName,
            amount,
            paymentName: "Transfer to wallet",
            paymentRef: "N/A",
            transactionType: "credit",
            reference
        });
        await receiverTransaction.save();

        // return new balance of sender
        res.status(200).json({ success: true, balance: senderWallet.balance });
    } catch (error) {
        console.log("error transferring to wallet", error);
        res.status(500).json({ success: false, msg: "internal server error" });
    }
};

//TODO: reference 
export const withdrawFromWallet = async (req, res) => {
    const { amount, bankName, accountName, accountNumber, description } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ success: false, msg: "invalid amount" });
    }
    if (!bankName || !accountName || !accountNumber || !description) {
        return res
            .status(400)
            .json({ success: false, msg: "all fields are required" });
    }
    try {
        let sender = await User.findOne({ _id: req.userId });
        let senderWallet = await Wallet.findOne({ userId: req.userId });
        let reference = generateRefernce();
        if (!senderWallet) {
            return res
                .status(404)
                .json({ success: false, msg: "sender wallet not found" });
        }
        if (senderWallet.balance < amount) {
            return res
                .status(400)
                .json({ success: false, msg: "insufficient balance" });
        }

        // deduct from sender wallet
        senderWallet.balance -= amount;
        await senderWallet.save();

        // create transaction for sender
        const senderTransaction = new Transaction({
            from: sender.BusinessName,
            to: accountName,
            amount,
            paymentName: `Withdraw to ${bankName} - ${accountNumber} ${accountName} ${amount}`,
            paymentRef: "N/A",
            transactionType: "debit",
            reference,
        });
        await senderTransaction.save();
        res
            .status(200)
            .json({ success: true, balance: senderWallet.balance });
    } catch (error) {
        console.log("error withdrawing from wallet", error);
        res.status(500).json({ success: false, msg: "internal server error" });
    }
}

// get wallet balance by user id
export const getWalletBalance = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      return res.status(404).json({ success: false, msg: "wallet not found" });
    }
    res.status(200).json({ success: true, balance: wallet.balance });
  } catch (error) {
    console.log("error getting wallet balance", error);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
}


