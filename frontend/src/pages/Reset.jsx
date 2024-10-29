import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Reset = () => {
    const[password,setPassword]=useState("")
    const[cpassword,setcPassword]=useState("")
    const[passwordError,setpasswordError]=useState(null)
    const{token}=useParams()
    const navigate=useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            // Check if password and confirm password are filled
            if (!password || !cpassword) {
                setpasswordError("Both password fields must be filled");
            }
            // Check if password and confirm password match
            else if (password !== cpassword) {
                setpasswordError("Passwords do not match");
            } 
            // If everything is valid, send the PUT request
            else {
                // const token = "your_token_here";  // Replace with actual token value
                const response = await axios.put(`http://localhost:5501/user/resetpassword/${token}`, {
                    password: password
                   });
                navigate('/')
                console.log("Password updated successfully:", response.data);
            }
        } catch (error) {
            console.error("Error updating password:", error);
            // Optionally, handle the error by setting an error message in the UI
            setpasswordError("An error occurred while updating the password");
        }
    };
    

    
  return (
    <div className='bg-gradient-to-b from-green-600 from-50% to-slate-300 to-50% via-green-600 h-screen grid place-content-center'>
      <h1 className='text-2xl m-5 font-medium'>employee management system</h1>
      <div className='w-[400px] p-5 rounded-xl filter'>
        <div className='blurs'></div>
        <h1 className='text-2xl font-bold'>Create Account</h1>
        <form onSubmit={handleSubmit}>
          
          <label htmlFor='password' className='block text-xl'>Password</label>
          <input type="password" id='password' placeholder='Enter password' required className='border text-xl focus:outline-none border-black block w-[100%] mb-1 p-1 text-black' onChange={(e)=>setPassword(e.target.value)}/>
          <label htmlFor='cpassword' className='block text-xl'>Confirm Password</label>
          <input type="password" id='cpassword' placeholder='Enter password' required className='border text-xl focus:outline-none border-black block w-[100%] mb-1 p-1 text-black' onChange={(e)=>setcPassword(e.target.value)}/>
          {passwordError&&<h1 className='text-black text-xl'>{passwordError}</h1>}
          <button type='submit' className='block bg-blue-500 w-[100%] text-xl p-1 text-white mt-3 text-center'>Sign up</button>
          
        </form>
        
      </div>
      
            
            
    </div>
  )
}

export default Reset