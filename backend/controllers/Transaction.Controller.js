import {Transaction} from '../models/Transaction.model.js'
import { Wallet } from '../models/Wallet.model.js'
import {Payment} from '../models/PaymentLink.model.js'
import { generateRefernce } from "../utils/generateRefernce.js";

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

// Handle payment using a payment link
export const payWithPaymentLink = async (req, res) => {
  try {
    const { fromEmail, from, amount } = req.body;
    const { paymentRef } = req.params;

    // Validate request
    if (!fromEmail || !from || !amount || !paymentRef) {
      return res.status(400).json({
        success: false,
        msg: 'Provide your name, email, amount, and payment reference',
      });
    }
    let reference = generateRefernce();

    // Find payment link
    const payment = await Payment.findOne({ paymentRef });
    if (!payment) {
      return res.status(404).json({ success: false, msg: 'No payment link found' });
    }

    // Find receiver and sender wallets
    const receiverWallet = await Wallet.findById(payment.walletId);
    if (!receiverWallet) {
      return res.status(404).json({
        success: false,
        msg: 'No wallet found for this payment link',
      });
    }

    const senderWallet = await Wallet.findOne({ userId: req.userId });
    if (!senderWallet) {
      return res.status(404).json({
        success: false,
        msg: 'No wallet found for sender',
      });
    }

    // Validate amount
    if (amount < payment.minimumAmountForPayment) {
      return res.status(400).json({
        success: false,
        msg: `Amount must be at least ${payment.minimumAmountForPayment}`,
      });
    }

    // Check sender balance
    if (senderWallet.balance < amount) {
      return res.status(400).json({
        success: false,
        msg: "Insufficient balance in sender's wallet",
      });
    }

    // Create sender (debit) transaction
    const senderTransaction = new Transaction({
      fromEmail,
      from,
      to: receiverWallet.userId,
      receiverWalletId: payment.walletId,
      amount,
      paymentName: payment.paymentName,
      paymentRef,
      transactionType: 'debit',
      reference,
    });

    // Create receiver (credit) transaction
    const receiverTransaction = new Transaction({
      fromEmail,
      from,
      to: receiverWallet.userId,
      receiverWalletId: payment.walletId,
      amount,
      paymentName: payment.paymentName,
      paymentRef,
      transactionType: 'credit',
      reference,
    });

    // Update wallet balances
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await Promise.all([
      senderWallet.save(),
      receiverWallet.save(),
      payment.updateOne({ $inc: { totalAmount: amount } }),
      senderTransaction.save(),
      receiverTransaction.save(),
    ]);

    // TODO: send email notifications here

    return res.status(201).json({
      success: true,
      msg: 'Payment successful',
      senderTransaction,
      receiverTransaction,
    });
  } catch (error) {
    console.error('Error during payment transaction:', error);
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
};

// Get all transactions
// both credit and debit transactions
export const getTransactions = async (req, res) => {
  try {
    const txns = await Transaction.find();
    if (!txns.length) {
      return res.status(404).json({ success: false, msg: 'No transactions found' });
    }
    res.status(200).json({ success: true, txns });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(400).json({
      success: false,
      msg: 'Error occurred while fetching transactions',
    });
  }
};

// Get transactions by logged-in user
// This fetches both sent (debit) and received (credit) transactions
export const getTransactionByUserId = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        msg: 'No wallet found for this user',
      });
    }
    // Only debit transactions (money sent)
    const sent = await Transaction.find({
      senderWalletId: wallet._id,
      transactionType: "debit"
    });

    // Only credit transactions (money received)
    const received = await Transaction.find({
      receiverWalletId: wallet._id,
      transactionType: "credit"
    });

    if (!sent.length && !received.length) { 
      res.status(404).json({ success: false, msg: 'No transactions found' });
    }

    res.status(200).json({ success: true, txns: [sent, received ] });
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    res.status(400).json({
      success: false,
      msg: 'Error occurred while fetching transactions',
    });
  }
};

// Get transactions by payment link reference
export const getTransactionPaymentLink = async (req, res) => {
  try {
    const { paymentRef } = req.query;
    if (!paymentRef) {
      return res.status(400).json({
        success: false,
        msg: 'Provide payment reference',
      });
    }

    const txns = await Transaction.find({ paymentRef, transactionType:"credit" })

    if (!txns.length) {
      return res.status(404).json({ success: false, msg: 'No transactions found' });
    }

    res.status(200).json({ success: true, txns });
  } catch (error) {
    console.error('Error fetching transactions by payment link:', error);
    res.status(400).json({
      success: false,
      msg: 'Error occurred while fetching transactions',
    });
  }
};


// get transaction by reference, the reference is unique to every transaction both debit and credit
export const getTransactionByReference = async(req, res) =>{
  const {reference} = req.body;
  if (!reference) {
    res.status(400).json({
      success:false,
      msg: "field must be provided"
    })
  }
  try {
    const txn = await Transaction.findOne({reference});
    res.status(200).json({
      success:true,
      msg:txn
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: 'Error occurred while fetching transaction',
    });
  }

}