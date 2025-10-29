import express from "express"
const router = express.Router()
import { payWithPaymentLink,getTransactions, getTransactionByUserId, getTransactionPaymentRef ,getTransactionByReference} from "../controllers/Transaction.Controller.js"
import { protect } from "../middlewares/protect.js"

router.post('/pay/:paymentRef', protect, payWithPaymentLink);

// only logged in users can access these get routes

//get all transactions 
router.get('/transactions', getTransactions);

//get transactions by user id -> loged in user
router.get('/transactions/user', protect, getTransactionByUserId);

//get transactions by payment link
// payment link is sent as query param
// example /api/transaction/transactions?paymentRef=abc123
router.get('/transactions/by-payment-link', getTransactionPaymentRef);

// example /api/transaction/transactions?reference=abc123
router.get('/transactions/reference', getTransactionByReference);


//test route

router.get('/testcreate-transaction',(req,res)=>{
    res.status(400).json({
        msg:"Transaction created"
    })
})

export default router // connected to index.js