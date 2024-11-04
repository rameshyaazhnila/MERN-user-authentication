import React, { useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom'


import Input from './Component/Input'
import { User, Mail, Lock, Loader } from 'lucide-react';
import {motion} from 'framer-motion'
import PasswordStrength from './Password/PasswordStrength'
import userStore from './Global/Zustand'






const Signup = () => {

  const signup=userStore((state)=>state.signup)
  const isAuth=userStore((state)=>state.isAuth)
  const error=userStore((state)=>state.error)
  const isLoading=userStore((state)=>state.isLoading)
  
  const navigate=useNavigate()
  

  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[strengthMeter,setstrengthMeter]=useState()
  // const [isLoading,setisLoading]=useState(false)


  
    
    
  const handleSubmit=async(event)=>{
    event.preventDefault()
    if(strengthMeter==4){
      try {
        await signup(username,email,password)
        navigate('/otp')
      } catch (error) {
         console.log(error.response.data);
         navigate('/signup')
       
         
      }
    }
  }
  const Nav_signin=()=>{
    navigate('/signin')
  }


      // try {
      //   setisLoading(true)
      //   const response =await axios.post("http://localhost:5501/user/create/",{username,email,password},{withCredentials: true})
      //   setisLoading(false)
      //   if(response.data.isAuth){
      //     navigate('/otp')
      //   }

      // } catch (error) {
      //  setisLoading(false)
      //  setcreateemailError("not found");
      //  console.log("error block work NORMAL");
       
      //  navigate('/')
      // }
      
  
  return (
    <div className='bg-gradient-to-b from-green-600 from-50% to-slate-300 to-50% via-green-600 h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl m-5 font-medium'>employee management system</h1>
      <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className='m-w-[330px] sm:w-[400px] overflow-hidden rounded-xl p-5 filter hover:shadow-[0_30px_60px_rgba(0,7,0,0.70)]'>
        <div className='blurs'></div>
        <h1 className='text-2xl font-bold mb-1'>Create Account</h1>
        <form onSubmit={handleSubmit} className='relative'>
          <Input IconComponent={User} iconStyle="text-green-900 border-none p-1" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" required type="text" disabled={isLoading}/>
          {/* {error &&<p className='absolute text-red-700 font-bold text-[20px] z-10 top-10 left-3'>{error}</p>} */}
          <Input IconComponent={Mail} iconStyle="text-green-900 border-none p-1" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required type="email" disabled={isLoading}/>
          <Input IconComponent={Lock} iconStyle="text-green-900 border-none p-1" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required type="password" disabled={isLoading}/>
          <PasswordStrength password={password} setstrengthMeter={setstrengthMeter}/>
          <button type="submit" className="bg-blue-700 w-full text-xl p-2 text-white relative flex justify-center items-center">{isLoading?(<span className="flex items-center space-x-2"><Loader className="animate-spin" size={30} /><p className="text-xl">Loading</p></span>):("Sign up")}</button>

          <h1 className='text-center'>Already have an Account?{"  "}<button className='border bg-gradient-to-r from-blue-600 to-blue-300 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-600 py-1 px-2 text-white rounded-xl' onClick={Nav_signin}>Sign in</button></h1>
        </form>
        
      </motion.div>
      
    </div>
  )
}

export default Signup







// try {
//   setisLoading(true)
//   const response=await axios.post("http://localhost:5501/user/create/",{username,email,password},{withCredentials: true})
//   navigate('/otp')
//   setisLoading(false)

// } 
// catch (error) {
//  setisLoading(false)
//  setcreateemailError(error.response.data);
//  console.log("error block work");
 
//  navigate('/')
// }

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Input from './Component/Input';
// import { User, Mail, Lock, Loader } from 'lucide-react';
// import { motion } from 'framer-motion';
// import PasswordStrength from './Password/PasswordStrength';
// import userStore from './Global/Zustand';

// const Signup = () => {
//   const signup = userStore((state) => state.signup);
//   const isAuth = userStore((state) => state.isAuth);
//   const error = userStore((state) => state.error);
//   const isLoading = userStore((state) => state.isLoading); // Use the global isLoading state

//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [createemailError, setCreateEmailError] = useState(null);
//   const [strengthMeter, setStrengthMeter] = useState(0);

//   const navigate = useNavigate();

//   // Navigate to /otp if the user is authenticated
//   useEffect(() => {
//     if (isAuth) {
//       navigate('/otp');
//     }
//   }, [isAuth, navigate]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (strengthMeter === 4) {
//       try {
//         await signup(username, email, password);
//       } catch (error) {
//         console.log(error.message); // Log the error for debugging
//         setCreateEmailError(error.message); // Show error in the UI
//       }
//     } else {
//       setCreateEmailError('Password strength is not sufficient');
//     }
//   };

//   return (
//     <div className='bg-gradient-to-b from-green-600 from-50% to-slate-300 to-50% via-green-600 h-screen grid place-content-center'>
//       <h1 className='text-2xl m-5 font-medium'>Employee Management System</h1>
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className='max-w-[400px] overflow-hidden rounded-xl p-5 filter hover:shadow-[0_30px_60px_rgba(0,7,0,0.70)]'>
//         <div className='blurs'></div>
//         <h1 className='text-2xl font-bold mb-1'>Create Account</h1>
//         <form onSubmit={handleSubmit} className='relative'>
//           <Input
//             IconComponent={User}
//             iconStyle='text-green-900 border-none p-1'
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder='Username'
//             required
//             type='text'
//             disabled={isLoading}
//           />
//           {createemailError && (
//             <p className='absolute text-red-700 font-bold text-[20px] z-10 top-10 left-3'>
//               {createemailError}
//             </p>
//           )}
//           <Input
//             IconComponent={Mail}
//             iconStyle='text-green-900 border-none p-1'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder='Email'
//             required
//             type='email'
//             disabled={isLoading}
//           />
//           <Input
//             IconComponent={Lock}
//             iconStyle='text-green-900 border-none p-1'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder='Password'
//             required
//             type='password'
//             disabled={isLoading}
//           />
//           <PasswordStrength password={password} setstrengthMeter={setStrengthMeter} />
//           <button
//             type='submit'
//             className='bg-blue-700 w-full text-xl p-2 text-white relative flex justify-center items-center'>
//             {isLoading ? (
//               <span className='flex items-center space-x-2'>
//                 <Loader className='animate-spin' size={30} />
//                 <p className='text-xl'>Loading</p>
//               </span>
//             ) : (
//               'Sign up'
//             )}
//           </button>

//           <h1 className='text-center'>
//             Already have an Account?{' '}
//             <button className='border bg-gradient-to-r from-blue-600 to-blue-300 hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-600 py-1 px-2 text-white rounded-xl'>
//               Sign in
//             </button>
//           </h1>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;

































// {!isSignin&&<motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className='w-[400px] p-5 rounded-xl filter hover:shadow-[0_40px_60px_rgba(0,0,0,0.50)]'>
//         <div className='blurs'></div>
//         <h1 className='text-2xl font-bold'>Sign in</h1>
//         <form onSubmit={handleSubmitLogin}>
//           <div className='flex flex-col'>
//           {emailError && <h1 className='absolute'>{emailError}</h1>}
//           <Input IconComponent={Mail} iconStyle="text-green-900 border-none p-1" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" required type="email"/>
//           {passwordError && <h1 className='text-xl text-red-600 absolute top-8'>{passwordError}</h1>}
//           <Input IconComponent={Lock} iconStyle="text-green-900 border-none p-1" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required type="password"/>
//           </div>
//           <div className='flex justify-between items-center mt-2 font-bold'>
//             <div>
//               <input type="checkbox" placeholder='email' id='remember'/>
//               <label htmlFor='remember' className='cursor-pointer pr-5'>Remember me</label>
//             </div>
            
//             <button onClick={HandleCreate} className='border bg-gradient-to-r from-blue-600 to-blue-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 py-1 px-2 text-white rounded-xl'>Create Account</button>
            
//           </div>
//           <button type="submit" className="bg-blue-700 w-full text-xl p-2 text-white relative flex justify-center items-center">{isLoading?(<span className="flex items-center space-x-2"><Loader className="animate-spin" size={30} /><p className="text-xl">Loading</p></span>):("Login")}</button>
//           <button onClick={Handleforgot}>Forget Password?</button>
//         </form>
//       </motion.div>}