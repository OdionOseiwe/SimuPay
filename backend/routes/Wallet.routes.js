import express from "express"
const router = express.Router()
import {protect} from '../middlewares/protect.js'
import { getWalletBalance } from "../controllers/Wallet.controller.js"

// all routes here are prefixed with /api/wallet
// protect middleware to protect routes
// only logged in users can access these routes

//get wallet balance for loged in user
router.get('/balance', protect, getWalletBalance)

//test route

router.get('/testget-balance',(req,res)=>{
    res.status(400).json({
        msg:"Wallet balance fetched"
    })
})

export default router // connected to index.js