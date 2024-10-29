// import React, { useState} from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { useContext } from 'react'
// import {myappContext} from '../App'
// import Input from './Component/Input'
// import { User, Mail, Lock } from 'lucide-react';



// const Login = () => {
//   const {setIsLogin } = useContext(myappContext);
//   const[username,setUsername]=useState("")
//   const[email,setEmail]=useState("")
//   const[password,setPassword]=useState("")
//   const[cpassword,setcPassword]=useState("")
//   const[isSignin,setIsSignin]=useState(true)
//   const[emailError,setemailError]=useState("")
//   const[passwordError,setpasswordError]=useState("")
//   const navigate=useNavigate()
  
//   const handleSubmit=async(event)=>{
//     event.preventDefault()
//     if(password===cpassword){
//       try {
//         const response=await axios.post("http://localhost:5501/user/create/",{username,email,password},{withCredentials: true})
//         setIsLogin(response.data.isAuth)//true or false
//         navigate('/otp')
  
//       } catch (error) {
//        setIsLogin(false)
//        navigate('/')
//       }
//     }
//     else{
//       setpasswordError("Password must be match")
//     }
//   }
//   const HandleSignin=()=>{
//     setIsSignin(false)
//     setEmail("")
//     setPassword("")
//     setemailError(null)
//     setpasswordError(null)
//   }
//   const HandleCreate=()=>{
//     setIsSignin(true)
//     setEmail("")
//     setPassword("")
//   }
//   const Handleforgot=()=>{
//     setIsSignin(true)
//     setEmail("")
//     setPassword("")
//     navigate('/forgot')

//   }
//   const handleSubmitLogin=async(event)=>{
//     event.preventDefault()
//     try {
//       const response=await axios.post("http://localhost:5501/user/login/",{email,password},{withCredentials: true})
//       setIsLogin(response.data.isAuth)//true or false
//       navigate('/home')
//      } catch (error) {
//       setIsLogin(false);
//       // Check if error.response and error.response.data exist
//       if (error.response && error.response.data) {
          
//           setemailError(error.response.data.ok === "bad" ? error.response.data.email_error: null);//return res.status(400).json({password_error:"Password is incorrect"})
//           setpasswordError(error.response.data.password_error || "Password is incorrect");//return res.status(400).json({email_error:"Email or Password is incorrect",ok:"bad"})
//       } else {
//           // Fallback error handling
//           setpasswordError("An unexpected error occurred");
//           setemailError("An unexpected error occurred");
//       }
//   }
//   }
  
//   return (
//     <div className='bg-gradient-to-b from-green-600 from-50% to-slate-300 to-50% via-green-600 h-screen grid place-content-center'>
//       <h1 className='text-2xl m-5 font-medium'>employee management system</h1>
//       {isSignin&&<div className='w-[400px] p-5 rounded-xl filter hover:shadow-[10_10px_20px_rgba(0,0,0,0.50)]'>
//         <div className='blurs'></div>
//         <h1 className='text-2xl font-bold'>Create Account</h1>
//         <form onSubmit={handleSubmit}>
//           {/* <Input /> */}
//           <Input IconComponent={User} iconStyle="text-green-900 border-2 bg-green-300 border-none" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
//           <Input IconComponent={Mail} iconStyle="text-green-900 border-2 bg-green-300 border-none" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
//           <Input IconComponent={Lock} iconStyle="text-green-900 border-2 bg-green-300 border-none" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
//           <Input IconComponent={Lock} iconStyle="text-green-900 border-2 bg-green-300 border-none" value={cpassword} onChange={(e)=>setcPassword(e.target.value)} placeholder="Confirm Password"/>
//           <label htmlFor='username' className='block text-xl'>Username</label>
//           <input type="text" placeholder='Enter username' id='username' required className='w-[100%] text-xl mb-1 p-1 border focus:outline-none border-black text-black' onChange={(e)=>setUsername(e.target.value)}/>
//           <label htmlFor='email' className='block text-xl'>Email</label>
//           <input type="email" placeholder='Enter email' id='email' required className='w-[100%] text-xl mb-1 p-1 border focus:outline-none border-black text-black' onChange={(e)=>setEmail(e.target.value)}/>
//           <label htmlFor='password' className='block text-xl'>Password</label>
//           <input type="password" id='password' placeholder='Enter password' required className='border text-xl focus:outline-none border-black block w-[100%] mb-1 p-1 text-black' onChange={(e)=>setPassword(e.target.value)}/>
//           <label htmlFor='cpassword' className='block text-xl'>{passwordError?passwordError:"Confirm Password"}</label>
//           <input type="password" id='cpassword' placeholder='Enter password' required className='border text-xl focus:outline-none border-black block w-[100%] mb-1 p-1 text-black' onChange={(e)=>setcPassword(e.target.value)}/>
//           <div className='flex justify-around items-center mt-2 text-[15px] font-bold'>
//             <div>
//             <input type="checkbox" placeholder='email' id='remember'/>
//             <label htmlFor='remember' className='cursor-pointer pr-5'>I agree to term and conditions</label>
//             </div>
//             <button className='border bg-gradient-to-r from-blue-600 to-blue-300 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-600 py-1 px-2 text-white rounded-xl' onClick={HandleSignin}>Sign in</button>
//           </div>
//           <button type='submit' className='block bg-blue-500 w-[100%] text-xl p-1 text-white mt-3 text-center'>Sign up</button>
          
//         </form>
        
//       </div>}
//       {!isSignin&&<div className='w-[400px] p-5 rounded-xl filter'>
//         <div className='blurs'></div>
//         <h1 className='text-2xl font-bold'>Sign in</h1>
//         <form onSubmit={handleSubmitLogin}>
//           <label htmlFor='email' className={`block text-xl ${emailError?"text-white":"text-white"}`}>{emailError?emailError:"Email"}</label>
//           <input type="email" placeholder='Enter email' id='email' required className='w-[100%] text-xl mb-1 p-1 border focus:outline-none border-black text-black' onChange={(e)=>setEmail(e.target.value)}/>
//           <label htmlFor='password' className={`block text-xl ${passwordError?"text-white":"text-white"}`}>{passwordError?passwordError:"Password"}</label>
//           <input type="password" id='password' placeholder='Enter password' required className='border text-xl focus:outline-none border-black block w-[100%] mb-1 p-1 text-black' onChange={(e)=>setPassword(e.target.value)}/>
          
//           <div className='flex justify-between items-center mt-2 font-bold'>
//             <div>
//               <input type="checkbox" placeholder='email' id='remember'/>
//               <label htmlFor='remember' className='cursor-pointer pr-5'>Remember me</label>
//             </div>
            
//             <button onClick={HandleCreate} className='border bg-gradient-to-r from-blue-600 to-blue-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 py-1 px-2 text-white rounded-xl'>Create Account</button>
            
//           </div>
//           <button type='submit' className='block bg-blue-500 w-[100%] text-xl p-1 text-white mt-3 text-center font-medium'>Login</button>
//           <button onClick={Handleforgot}>Forget Password?</button>
//         </form>
//       </div>}
//     </div>
//   )
// }

// export default Login


// "start": "nodemon --exec \"cls && node\" --env-file=.env backend/routes/index.js -q"

// 

// "start": "nodemon --exec \"cls && node\" --env-file=.env backend/routes/index.js -q"