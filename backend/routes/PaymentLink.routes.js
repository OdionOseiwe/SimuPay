import express from "express"
const router = express.Router()
import { createPaymentLink, getAllPaymentLinks } from "../controllers/Payment.controller.js"
import { protect } from "../middlewares/protect.js"


// protect middleware to protect routes
// only logged in users can access these routes

//create a payment link
router.post('/payment-link', protect, createPaymentLink)

//get all payment links created by a  loged in user
router.get('/all-links', protect, getAllPaymentLinks)

//test route

router.get('/testcreate-link',(req,res)=>{
    res.status(400).json({
        msg:"Project created"
    })
})

export default router // connected to index.js