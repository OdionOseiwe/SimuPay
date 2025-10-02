import {User} from '../models/User.model.js'
import { Wallet } from '../models/Wallet.model.js'
import bcrypt from "bcryptjs";
import crypto from 'crypto'
import dotenv from 'dotenv'
import {generateTokenAndSetCookie} from '../utils/generateAndSetToken.js'
dotenv.config()


export const signup = async(req,res)=>{
    const {email, password, BusinessName} = req.body;
    try{
        if(!email || !password || !BusinessName){
            res.status(400).json({sucess:false,msg:"empty body"})
        }
        const userAlreadyExit = await User.findOne({email});
        if(userAlreadyExit){
            res.status(400).json({sucess:false,msg:"user already"})
        }
        const randomToken = crypto.randomInt(10000, 99999);

        const hashPassword = await bcrypt.hash(password, 10);

        // create user
        const user = new User({
            email,
            password:hashPassword,
            BusinessName,
            verificationToken: randomToken,
            verificationTokenExpireAt:Date.now() + 2 * 60 * 1000, // 2 minutes
            
        })
        await user.save();

        //create wallet for user
        const wallet = new Wallet({
            userId:user._id,
            balance:0
        })
        await wallet.save();

        //set cookie
        generateTokenAndSetCookie(res, user._id);

        //token email sent

        res.status(200).json({sucess:false,user:{
            ...user._doc,
            password:undefined
        }})
    }catch(error){
        res.status(400).json({sucess: false, msg:"error occured while signingup"})
        console.log("error occured", error);
        
    }
}

export const verifyEmail = async(req, res)=>{
    const {code} = req.body
    try {
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpireAt:{gt:Date()}
        })
        if(!user){
            res.status(400).json({success:false, msg:"Token expired or invalid token"})
        }

        user.isverified=true;
        user.verificationToken = undefined;
        user.verificationTokenExpireAt = undefined;

        user.save();

        //welcome mail sent

        res.status(200).json({
            success:true, msg:"Welcome Mail sent"
        });

    } catch (error) {
        res.status(400).json({sucess: false, msg:"error occured while verifing email"})
        console.log("error occured", error);        
    }
}

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
            res.status(404).json({sucess:false, msg:"invalid password"})
        }

        generateTokenAndSetCookie(res, user._id);

        res.status(200).json({
            success:true, msg:"sucessfully login"
        });

    } catch (error) {
        res.status(400).json({sucess: false, msg:"error occured while logingin"})
        console.log("error occured", error);
    }
}

export const resendVerificationCode = async(req,res) =>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if (user.isverified) {
            res.status(200).json({
                success:false, msg:"user verified"
            });   
        }
        if (user.verificationTokenExpireAt > Date.now()) {
            res.status(200).json({
                success:false, msg:"token not expired"
            });
        }

        const randomToken = crypto.randomInt(10000, 99999);
        user.verificationToken=randomToken;
        user.verificationTokenExpireAt=Date.now() + 2 * 60 * 1000;
        user.save();
    } catch (error) {
        res.status(400).json({sucess: false, msg:"error occured"})
        console.log("error occured", error);
    }
}

export  const logout =(req,res)=>{
    try {
        res.clearCookie("userToken");
        res.status(200).json({
            success:true, msg:"user logouted"
        });
    } catch (error) {
        res.status(400).json({sucess: false, msg:"error occured while logingout"})
        console.log("error occured", error);
    }
}

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