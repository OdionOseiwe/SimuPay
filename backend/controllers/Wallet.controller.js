import { Wallet } from "../models/Wallet.model.js";
import { Transaction } from "../models/Transaction.model.js";
import { User } from "../models/User.model.js";
import { generateRefernce } from "../utils/generateRefernce.js";

export const mockMoney = async (req, res) => {
  // Ensure numeric amount
  const amount = Number(req.body.amount);
  if (amount <= 0) {
    return res.status(400).json({ success: false, msg: "invalid amount" });
  }

  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) return res.status(404).json({ success: false, msg: "wallet not found" });

    wallet.balance = Number(wallet.balance) + amount;
    await wallet.save();

    res.status(200).json({ success: true, balance: wallet.balance });
  } catch (error) {
    console.error("error mocking money", error);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
};

export const transferToWallet = async (req, res) => {
  const amount = Number(req.body.amount);
  const { BusinessName } = req.body;

  if (!BusinessName) return res.status(400).json({ success: false, msg: "BusinessName is required" });
  if (amount <= 0) return res.status(400).json({ success: false, msg: "invalid amount" });

  try {
    const receiver = await User.findOne({ BusinessName: BusinessName });
    const sender = await User.findOne({ _id: req.userId });

    if (!receiver) return res.status(404).json({ success: false, msg: "receiver not found" });
    if (!sender) return res.status(404).json({ success: false, msg: "sender not found" });

    const receiverWallet = await Wallet.findOne({ userId: receiver._id });
    const senderWallet = await Wallet.findOne({ userId: req.userId });

    if (!receiverWallet) return res.status(404).json({ success: false, msg: "receiver wallet not found" });
    if (!senderWallet) return res.status(404).json({ success: false, msg: "sender wallet not found" });

    if (senderWallet.balance < amount) {
      return res.status(400).json({ success: false, msg: "insufficient balance" });
    }

    const reference = generateRefernce();

    // Use numeric operations explicitly
    senderWallet.balance = Number(senderWallet.balance) - amount;
    receiverWallet.balance = Number(receiverWallet.balance) + amount;

    await senderWallet.save();
    await receiverWallet.save();

    const senderTransaction = new Transaction({
      fromEmail: sender.email,
      from: sender.BusinessName ,
      to: receiver.BusinessName,
      amount,
      paymentName: "Transfer to wallet",
      paymentRef: "N/A",
      transactionType: "debit",
      reference,
      createdAt: new Date()
    });

    const receiverTransaction = new Transaction({
      fromEmail: sender.email ,
      from: sender.BusinessName ,
      to: receiver.BusinessName,
      amount,
      paymentName: "Transfer to wallet",
      paymentRef: "N/A",
      transactionType: "credit",
      reference,
      createdAt: new Date()
    });

    const savedSenderTxn = await senderTransaction.save();
    const savedReceiverTxn = await receiverTransaction.save();

    console.log("transferToWallet - saved txns", { savedSenderTxn, savedReceiverTxn });

    res.status(200).json({
      success: true,
      balance: senderWallet.balance,
      txns: { sender: savedSenderTxn, receiver: savedReceiverTxn }
    });
  } catch (error) {
    console.error("error transferring to wallet", error);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
};

export const withdrawFromWallet = async (req, res) => {
  const amount = Number(req.body.amount);
  const { bankName, accountName, accountNumber, description } = req.body;

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ success: false, msg: "invalid amount" });
  }
  if (!bankName || !accountName || !accountNumber || !description) {
    return res.status(400).json({ success: false, msg: "all fields are required" });
  }

  try {
    const sender = await User.findOne({ _id: req.userId });
    const senderWallet = await Wallet.findOne({ userId: req.userId });
    if (!senderWallet) return res.status(404).json({ success: false, msg: "sender wallet not found" });

    if (Number(senderWallet.balance) < amount) {
      return res.status(400).json({ success: false, msg: "insufficient balance" });
    }

    senderWallet.balance = Number(senderWallet.balance) - amount;
    await senderWallet.save();

    const reference = generateRefernce();

    const senderTransaction = new Transaction({
      fromEmail: sender.email ,
      from: sender.BusinessName,
      to: accountName,
      amount,
      paymentName: `Withdraw to ${bankName} - ${accountNumber} ${accountName} ${amount}`,
      paymentRef: "N/A",
      transactionType: "debit",
      reference,
      createdAt: new Date()
    });

    const savedTxn = await senderTransaction.save();
    console.log("withdrawFromWallet - saved txn", savedTxn);

    res.status(200).json({ success: true, balance: senderWallet.balance, txn: savedTxn });
  } catch (error) {
    console.error("error withdrawing from wallet", error);
    res.status(500).json({ success: false, msg: "internal server error" });
  }
};


export const getWalletBalance = async (req, res) => { 
  try { 
    const wallet = await Wallet.findOne({ userId: req.userId }); 
    if (!wallet) 
      { return res.status(404).json({ success: false, msg: "wallet not found" }); } 
    res.status(200).json({ success: true, balance: wallet.balance }); 
  } catch (error) { 
    console.log("error getting wallet balance", error); 
    res.status(500).json({ success: false, msg: "internal server error" });
  }
};