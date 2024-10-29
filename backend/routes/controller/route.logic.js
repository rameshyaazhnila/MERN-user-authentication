import jwt from 'jsonwebtoken';
import User from '../../library/model/model.schema.js';

import { sendOTP, sendPasswordResetLink } from '../views/mail.support.js';
import { generateToken } from '../views/token/generate.jwt.js';

export const createUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        const err = new Error("Username, email, or password not found");
        err.status = 400;
        return next(err); // Return here to prevent further execution
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const err = new Error("User already exists");
            err.status = 409; // Conflict
            return next(err);
        }

        // Create new user with hashed password
        const created = new User({ username, email, password,email_otp:Math.floor(100000+Math.random()*900000).toString(),otp_expire_date: new Date(Date.now() + 5 * 60 * 1000)
        });
        await created.save()
        await generateToken(res,created._id,next)
        const responcedMail=await sendOTP(created.username,created.email,created.email_otp)
        res.status(201).json({ message: "User created successfully",isAuth:true });
    } catch (error) {
        const err = new Error(error.message||"internal server error");
        err.status = 500;
        next(err);
    }
};
//login controller
export const loginUser=async(req,res,next)=>{
    
    
    const{email,password}=req.body;
    if(!email || !password){
        const error=new Error("not valid username and password")
        error.status=400 //invalid
        return next(error)
    }
    try {
        const userData=await User.findOne({email})
        if (!userData) {
            // const error = new Error("Email or Password is incorrect"); // Pass a string message
            // error.status = 400; // Set the status to 400 for invalid input
            // error.details = { emailerror: "Email or Password is incorrect" }; // Add details separately
            // return next(error);
            return res.status(400).json({email_error:"Email or Password is incorrect",ok:"bad"})
        }
        
        const isMatch = await userData.comparePassword(password);
        if (!isMatch){
            return res.status(405).json({password_error:"Password is incorrect"})
        }
        await generateToken(res,userData._id,next)
        res.status(201).json({ message: "User logged in successfully",isAuth:true,user:userData });
    } catch (error) {
        const err = new Error(error.message || "Internal server error");
        err.status = 500;
        next(err);
    }
}
//user forgot password 
export const forgotUser=async(req,res,next)=>{
    
    try {
        const{email}=req.body;
        if(!email){
            const error=new Error("not valid username")
            error.status=400 //invalid
            console.log("1 block");
            return next(error)
        }
        const Forgot_user=await User.findOne({email})
        if(!Forgot_user){
            const error=new Error("not valid username")
            error.status=401 //invalid
            console.log("2 block");
            return next(error)
            // return res.status(402).json({error:"not valid username"})
        }
        const token=jwt.sign({userId:Forgot_user._id},process.env.SECRET_KEY,{expiresIn:300})
        Forgot_user.reset_password_token=token
        const date=new Date()
        const minutes=date.getMinutes()+5
        date.setMinutes(minutes)
        Forgot_user.reset_password_expiration=date;
        await Forgot_user.save()
        
        const responcedMail=await sendPasswordResetLink(Forgot_user.username,Forgot_user.email,token)
        if(!responcedMail){
            const error=new Error("not sending mail")
            error.status=401 //invalid
            console.log("3 block");
            return next(error)
        }
        res.status(200).json({msg:"Link send successfully provided Email"})
        } catch (error) {
            const err=new Error(error.message||"internal server error")
            err.status=500 //invalid
            console.log(("4 block"));
            return next(err)
         }

}


//reset password
export const resetPassword=async(req,res,next)=>{
    const{token}=req.params;
    const{password}=req.body;
    try {
        if(!token){
            const error=new Error("not access to authonticate")
            error.status=400 //invalid
            console.log("1 block");
            return next(error)
        }
        if(!password){
            const error=new Error("not valid password")
            error.status=400 //invalid
            console.log("2 block");
            return next(error)
        }
        const Ruser=await User.findOne({reset_password_token:token,reset_password_expiration:{$gt:Date.now()}})
        if(!Ruser){
            const error=new Error("cannot find")
            error.status=400 //invalid
            console.log("block");
            return next(error)
        }
        Ruser.password=password
        Ruser.reset_password_token=undefined
        Ruser.reset_password_expiration=undefined
        await Ruser.save()
        res.status(200).json({msg:"password reset successfully"})
    } catch (error) {
        const err=new Error(error.message||"internal server error")
        err.status=500 //invalid
        console.log("4block");
        return next(err)
    }
}

//otp verification

export const otpVerifications = async(req,res,next)=>{
    const {otp}=req.body;
    const token=req.cookies.token;
    
    if(!otp && !token){
        const error=new Error("enter valid OTP")
        error.status=400 //invalid
        console.log("1 block");
        return next(error)
    }
    try {
        
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        
        
        const user= await User.findOne({email_otp:otp,otp_expire_date:{$gt:Date.now()}})
        
        if (!user) {
            const error = new Error("Invalid OTP or OTP has expired");
            error.status = 406; // Bad request
            console.log("2nd block: OTP validation failed");
            return next(error);
        }
        user.isVerified=true
        user.email_otp=undefined
        user.otp_expire_date=undefined;
        await user.save()
        res.status(200).json({status:"success",isVerified:true})
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log(error.message);
        console.log("otp error");
        
        
        
      }
    }
    export const verifyauth = async(req,res)=>{
        try {
            
            const user = await User.findById(req.userId);
            if(!user){
                
                return res.status(401).json({isLoggedin:false,message:"invalid id to access jwt + user not found"})
            }
            res.status(200).json({ isLoggedin:true , userInfo:user});
        } catch (error) {
            return res.status(500).json({ isLoggedin: false, message: "Invalid or expired token" });
        }

    }

    export const logoutUser = async(req,res)=>{
        res.clearCookie("token");
	    res.status(200).json({ success: true, message: "Logged out successfully" });
        console.log("logout successfully");
    }

    // const token=req.cookies.token;
        // if(!decoded){
        //     return res.status(401).json({isLoggedin:false,message:"invalid tokenss"})
        // }
        // try {
        //     const decoded=jwt.clear(token,process.env.SECRET_KEY)
            
        //     res.status(200).json({ isLoggedin:false, userInfo:null});
        // } catch (error) {
        //     return res.status(500).json({ isLoggedin: false, message: "Invalid or expired token" });
        // }

        