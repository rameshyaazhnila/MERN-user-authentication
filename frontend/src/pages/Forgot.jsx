import axios from 'axios'
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import {Mail, Loader} from 'lucide-react';




import Input from './Component/Input'

const Forgot = () => {
    const[email,setemail]=useState("")
    const[error,setError]=useState("")
    const[msg,setMsg]=useState("")
    const[load,setLoad]=useState(false)
   
    const ResetPassword=async(event)=>{
        event.preventDefault()
      
        try {
            setError("")
            setMsg("")
            setLoad(true)
            const responsed=await axios.post("http://localhost:5501/user/forgot/",{email},{withCredentials: true})
            setMsg(responsed.data.msg);
            setLoad(false)

        } catch (error) {
            setError(error.response.data);
            setLoad(false)
            console.log(error);
            
            
        }
        
        
    }
  return (
    <div className='bg-gradient-to-b from-green-600 from-50% to-slate-300 to-50% via-green-600 h-screen grid place-content-center'>
        <div className='bg-white w-[400px] p-6 rounded-xl filter hover:shadow-[0_40px_60px_rgba(0,0,0,0.50)]'>
        <div className='blurs'></div>
        
            <h1 className='text-2xl font-bold'>Reset password via Mail</h1>
            <form onSubmit={ResetPassword}>
                <Input IconComponent={Mail} iconStyle="text-green-900 border-none p-1" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Email" required type="email"/>
                {msg && <p className='relative text-center text-lg'>{msg}<Mail className='ani'/></p>}
                {error && <p className='text-center text-lg '>{error}</p>}
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="flex items-center justify-center bg-blue-500 w-full text-xl p-1 text-white mt-3 text-center font-medium">{load && <Loader className="animate-spin mr-2" />}Reset</motion.button>
            </form>
        </div>
    </div>
  )
}

export default Forgot

