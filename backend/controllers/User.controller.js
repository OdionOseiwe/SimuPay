import {User} from '../models/User.model.js'
import { Wallet } from '../models/Wallet.model.js'
import bcrypt from "bcryptjs";
import crypto from 'crypto'
import dotenv from 'dotenv'
import {generateTokenAndSetCookie} from '../utils/generateAndSetToken.js'
import {sendVerificationEmail, welcomeEmail} from '../mailTrap/mail.js'
dotenv.config()

//user signup
// create a wallet for the user when they sign up
// send verification email with token
// token expires in 2 minutes
// user must verify email before they can log in
// set cookie with token
export const signup = async(req,res)=>{
    const {email, password, BusinessName} = req.body;
    try{
        if(!email || !password || !BusinessName){
            res.status(400).json({sucess:false,msg:"empty body"})
        }
        const userAlreadyExit = await User.findOne({email});
        if(userAlreadyExit ){
            res.status(400).json({sucess:false,msg:"user already exits"})
        }
        const randomToken = crypto.randomInt(10000, 99999);

        const hashPassword = await bcrypt.hash(password, 10);

        // create user
        const user = new User({
            email,
            password:hashPassword,
            BusinessName,
            verificationToken: randomToken,
            verificationTokenExpireAt:Date.now() + 5 * 60 * 1000, // 5 minutes
            
        })
        await user.save();

        const walletAlreadyExit = await Wallet.findOne({userId:user._id});
        if(walletAlreadyExit){
            res.status(400).json({sucess:false,msg:"wallet already exists"})
        }

        //create wallet for user
        const wallet = new Wallet({
            userId:user._id,
            balance:0
        })
        await wallet.save();

        //set cookie
        generateTokenAndSetCookie(res, user._id);

        //token email sent
        await sendVerificationEmail(email,randomToken);

        res.status(200).json({sucess:true,user:{
            ...user._doc,
            password:undefined
        }})
    }catch(error){
        res.status(400).json({sucess: false, msg:"error occured while signingup"})
        console.log("error occured", error);
        
    }
}

//verify email
export const verifyEmail = async(req, res)=>{
    const {code} = req.body
    try {
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpireAt:{$gt:Date.now()}
        })
        if(!user){
            res.status(400).json({success:false, msg:"Token expired or invalid token"})
        }

        user.isverified=true;
        user.verificationToken = undefined;
        user.verificationTokenExpireAt = undefined;

        user.save();

        //welcome mail sent
        await welcomeEmail(user.email, user.BusinessName);
        
        res.status(200).json({
            success:true, msg:"Welcome Mail sent",
            user:{
                ...user._doc,
                password:undefined
            }
        });

    } catch (error) {
        res.status(400).json({sucess: false, msg:"error occured while verifing email"})
        console.log("error occured", error);        
    }
}

//user login
export const login = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({sucess:false, msg:"invalid email or password"})
        }
        if(!user.isverified){
            return res.status(400).json({sucess:false, msg:"email not verified"})
        }
        //compare password
        const hashPassword = user.password;
        const comparePassword = await bcrypt.compare(password, hashPassword);
        if (!comparePassword) {
            res.status(404).json({sucess:false, msg:"invalid password",
            user:{
                ...user._doc,
                password:undefined
            }
            })
        }

        generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            success:true, user:{
                ...user._doc,
                password:undefined
            }
        });

    } catch (error) {
        res.status(400).json({sucess: false, msg:"error occured while logingin"})
        console.log("error occured", error);
    }
}

//resend verification code
export const resendVerificationCode = async(req,res) =>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            res.status(404).json({success:false, msg:"user not found"})
        }
        if (user.isverified) {
            res.status(200).json({
                success:false, msg:"user verified"
            });   
        }

        const randomToken = crypto.randomInt(10000, 99999);
        user.verificationToken=randomToken;
        user.verificationTokenExpireAt=Date.now() + 2 * 60 * 1000;
        user.save();
        res.status(200).json({
            success:true, msg:"verification code resent", code:randomToken
        });

        //resend email with token
        await sendVerificationEmail(email,randomToken);

    } catch (error) {
        res.status(400).json({sucess: false, msg:"error occured"})
        console.log("error occured", error);
    }
}

//user logout
export  const logout =(req,res)=>{
    try {
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        res.status(200).json({
            success:true, msg:"user logouted"
        });
    } catch (error) {
        res.status(400).json({sucess: false, msg:"error occured while logingout"})
        console.log("error occured", error);
    }
}

//check if user is authenticated
export const checkAuth = async(req,res)=>{
    try {
        const user = await User.findById(req.userId);
        if(!user){
            res.status(400).json({sucess:false,msg:"user not found"})
        }

        res.status(200).json({sucess:true, user:{
            ...user._doc,
            password:undefined
        }})
    } catch (error) {
        console.log("error finding user", error);    
    }
}