import express from 'express'
import route from './router.js'
import { notFound } from '../error/notfound.js'
import {errorHandle} from '../error/HandleError.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from '../library/database.js'
import path from 'path'
import dotenv from 'dotenv'



const port=process.env.PORT || 5501
dotenv.config()

connectDB()
const __dirname=path.resolve()
console.log("mongo success");
const app=express()
app.use(cors({origin:'http://localhost:5173',credentials:true}));
  
  


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/user/',route)

if(process.env.NODE_ENV=="developement"){
    app.use(express.static(path.join(__dirname,"frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })

}
else{
    // app.use(express.static(path.join(__dirname,"frontend/dist")));
    app.get("/",(req,res)=>{
        res.json(({msg:"server running successfully with developement"}))
    })
}
app.listen(port,()=>{
    console.log("server is successfully connected");
    
})

app.use(notFound)

app.use(errorHandle)


// app.get("/",(req,res)=>{
//     res.json(({msg:"server running successfully with developement"}))
// })

