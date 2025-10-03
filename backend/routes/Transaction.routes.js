import express from "express"
const router = express.Router()
import { createTransaction, getTransactionByUserId, getTransactionPaymentLink } from "../controllers/Transaction.Controller.js"
import { protect } from "../middlewares/protect.js"

// all routes here are prefixed with /api/transaction

router.post('/create-transaction', protect, createTransaction);
router.get('/get-transaction-byId', protect, getTransactionByUserId);
router.get('/get-transaction-byPayment', protect, getTransactionPaymentLink);

//test route

router.get('/testcreate-transaction',(req,res)=>{
    res.status(400).json({
        msg:"Transaction created"
    })
})

export default router // connected to index.js