import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from './Global/Zustand';



const Otp_verification = () => {
  const navigate=useNavigate()
  const [otp, setOTP] = useState('');
  const emailOTP=userStore((state)=>state.emailOTP)
  const isAuth=userStore((state)=>state.isAuth)
  

  const SubmitOTP = async (event) => {
    event.preventDefault();
    try {
      await emailOTP(otp)
      navigate('/signin')
    } catch (error) {
      console.log(error)
    }
    
  };
  // useEffect(()=>{
  //   console.log(isAuth);
  //   console.log(isAuth);
  //   console.log(isAuth);
    
  // },[isAuth])
  

  return (
    <div className="bg-gradient-to-b from-green-600 to-slate-300 via-green-600 h-screen grid place-content-center">
      <div className="bg-white w-[400px] p-5 rounded-xl filter">
        <h1 className="text-2xl font-bold text-center p-2">OTP sent to your email</h1>
        <form className="flex flex-col items-center" onSubmit={SubmitOTP}>
          <label htmlFor="otp" className="text-xl">Verify OTP</label>
          <input
            type="number"
            placeholder="Enter OTP"
            id="otp"
            required
            className="w-[100%] text-xl mb-1 p-1 border focus:outline-none border-black text-black"
            onChange={(e) => setOTP(e.target.value)}
          />
          <button
            type="submit"
            className="block bg-blue-500 w-[100%] text-xl p-1 text-white mt-3 text-center font-medium"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp_verification;




// try {
//   const response = await axios.post('http://localhost:5501/user/verify/otp/',{otp},{withCredentials: true});
  
//   if(response.data.status=="success"){
//     navigate('/signin')
//   }
//   console.log(response.data);
  
// } catch (error) {
//   console.error("bad");  // Logs any errors that occur
// }
