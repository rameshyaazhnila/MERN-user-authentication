import dotenv from 'dotenv'
import ejs, { renderFile } from 'ejs'
import nodemailer from 'nodemailer'
import url from 'url'
import path from 'path'

dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    // secure:false,  // You can use other services or SMTP server
    auth: {
        user:process.env.E_USERNAME,  // Replace with your email
        pass:process.env.E_PASSWORD,   // Replace with your email password or app-specific password
    },
});

export async function sendPasswordResetLink(name,email,token){
    try {
        const __filename=url.fileURLToPath(import.meta.url)
        const __dirname=path.dirname(__filename)
        const sibling=path.join(__dirname,"../views/gmail.ejs")
        console.log(sibling);
        const clientURL = process.env.CLIENT_URL;

        const renderedFile=await ejs.renderFile(sibling,{name,token,clientURL})
    
        const mailOptions = {
            from:process.env.E_USERNAME,
            to:email, 
            subject: 'Do not share your password',
            html:renderedFile, 
        };
    const info = await transporter.sendMail(mailOptions);
    
    return info
    } catch (error) {
         console.log(error.message);
         console.log("final block");
            
    }
}


export async function sendOTP(name,email,otp){
    try {
        const __filename=url.fileURLToPath(import.meta.url)
        const __dirname=path.dirname(__filename)
        const sibling=path.join(__dirname,"../views/otp.gmail.ejs")
        
        
        const renderedFile=await ejs.renderFile(sibling,{name,otp})
    
        const mailOptions = {
            from:process.env.E_USERNAME,
            to:email, 
            subject: 'Do not share your OTP',
            html:renderedFile, 
        };
    const info = await transporter.sendMail(mailOptions);
    
    return info
    } catch (error) {
         console.log(error.message);
         console.log("final block");
            
    }
}