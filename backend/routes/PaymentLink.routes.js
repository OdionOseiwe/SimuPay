import express from "express"
const router = express.Router()
import { createPaymentLink, getAllPaymentLinks } from "../controllers/Payment.controller.js"
import { protect } from "../middlewares/protect.js"

// all routes here are prefixed with /api/payment

router.post('/create-link', protect, createPaymentLink)
router.get('/get-all-links', protect, getAllPaymentLinks)

//test route

router.get('/create-project',(req,res)=>{
    res.status(400).json({
        msg:"Project created"
    })
    
})

export default router // connected to index.js