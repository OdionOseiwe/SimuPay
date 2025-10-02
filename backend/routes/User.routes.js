import express from "express"
const router = express.Router()
import {protect} from '../middlewares/protect.js'
import {signup, verifyEmail, login, logout,checkAuth} from '../controllers/User.controller.js'

router.get('/check-auth',protect,checkAuth);

router.post('/signup',signup);
router.post('/verify-email',verifyEmail);
router.post('/login',login);
router.post('/logout',logout);

    
export default router ;// connected to index.js