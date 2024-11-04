import React, { useEffect, useState } from 'react'
import Input from './Input'
import {motion} from 'framer-motion'
import {Mail, Lock, Loader} from 'lucide-react';
import userStore from '../Global/Zustand';

import {useNavigate} from 'react-router-dom'
const Signin = () => {
  const navigate=useNavigate()
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
 
    const[isLoading,setisLoading]=useState(false)

  // const signinn=userStore()
  // const {signin,isAuth,error}=userStore((state)=>({signin:state.signin,isAuth:state.isAuth,error:state.error}))
  // const error=userStore((state)=>state.error)
  const {signin,error,resetAction}=userStore()
  
    useEffect(()=>{
      resetAction()
    },[])
    const handleSubmitLogin= async(event)=>{
        event.preventDefault()
        
        
        try {
          
          await signin(email,password)
          navigate('/')
          
          
        } catch (error) {
          
          
        }
        
      }
      
      
      
      

      const ForgotPage=()=>{
        navigate("/forgot")
      }
      
    

  return (
    <div className='bg-gradient-to-b from-green-600 from-50% to-slate-300 to-50% via-green-600 h-screen flex flex-col items-center justify-center'>
        <h1 className='text-2xl m-5 font-medium'>Employee management system</h1>
        <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className='w-[300px] sm:w-[400px] p-5 rounded-xl filter hover:shadow-[0_40px_60px_rgba(0,0,0,0.50)]'>
        <div className='blurs'></div>
        <h1 className='text-2xl font-bold'>Sign in</h1>
        <form onSubmit={handleSubmitLogin}>
          <div className='flex flex-col'>
          <Input IconComponent={Mail} iconStyle="text-green-900 border-none p-1" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" required type="email"/>
          {error && <h1 className='text-xl text-red-600'>{error}</h1>}
          <Input IconComponent={Lock} iconStyle="text-green-900 border-none p-1" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required type="password"/>
          </div>
          <div className='flex justify-between items-center font-bold'>
            <div className='mb-2'>
              <input type="checkbox" placeholder='email' id='remember'/>
              <label htmlFor='remember' className='cursor-pointer pr-5'>Remember me</label>
            </div>
            <button className='mb-2' onClick={ForgotPage}>Forget Password?</button>
            
            
            
          </div>
          <button type="submit" className="bg-blue-700 w-full text-xl p-2 text-white relative flex justify-center items-center">{isLoading?(<span className="flex items-center space-x-2"><Loader className="animate-spin" size={30} /><p className="text-xl">Loading</p></span>):("Login")}</button>
          <p className='pt-2 text-lg cursor-pointer hover:scale-[1.1] transition-all hover:translate-x-5 text-gray-600 font-semibold' onClick={()=>navigate("/signup")}>create a new Account ?</p>
          
        </form>
      </motion.div>
    </div>
  )
}

export default Signin










{/* <button className='border bg-gradient-to-r from-blue-600 to-blue-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 py-1 px-2 text-white rounded-xl'>Create Account</button> */}





// try {
//   setisLoading(true)
//   const response=await axios.post("http://localhost:5501/user/login/",{email,password},{withCredentials: true})
//   setisLoading(false)
//   navigate('/home')
// } catch (error) {
//   setisLoading(false)
//   if (error.response && error.response.data) {
      
      
//       setpasswordError(error.response.data.password_error || "Incorrect password");//return res.status(400).json({email_error:"Email or Password is incorrect",ok:"bad"})
//   } else {

//       setpasswordError("An unexpected error occurred");
//       console.log("error in catch ");
  
//   }