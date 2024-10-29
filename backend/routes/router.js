import express from 'express'
import { createUser,forgotUser,loginUser,otpVerifications, resetPassword, verifyauth,logoutUser} from './controller/route.logic.js';
import { verifyToken } from './views/token/verify.token.js';
import path from 'path'

const route=express.Router()
const app=express()

route.post('/create',createUser)
route.post('/login',loginUser)
route.post('/forgot',forgotUser)
route.post('/verify/otp',otpVerifications)
route.put('/resetpassword/:token',resetPassword)
route.get('/verify/auth',verifyToken,verifyauth)
route.get('/logout',logoutUser)






export default route;