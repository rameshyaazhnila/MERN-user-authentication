import React, {useState } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Forgot from './pages/Forgot'
import Reset from './pages/Reset'
import Otp_verification from './pages/Otp'
import Signin from './pages/Component/Signin'
import Signup from './pages/Signup'
import userStore from './pages/Global/Zustand'
import { useEffect } from 'react'
import LoadingSpinner from './pages/Component/Loadingspinner'


const App = () => {
  const checkAuth= userStore((state) => state.checkAuth);
  
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  
  const checking = userStore((state) => state.isChecking);
  if(checking){
    return <LoadingSpinner/>
  }

 const Protection=({children})=>{
  const isAuth = userStore((state) => state.isAuth);
  const user = userStore((state) => state.user);
  if(!isAuth){
    return <Navigate to="/signin" replace />;
  }
  if(!user?.isVerified){
    return <Navigate to="/forgot" replace />;
  }
  return children
 }

 const Restricted=({children})=>{
  const isAuth = userStore((state) => state.isAuth);
  const user = userStore((state) => state.user);
 
  if(isAuth&&user?.isVerified){
    return <Navigate to="/" replace />;
  }
  return children
 }



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protection><Home/></Protection>}/>
        <Route path='/signup' element={<Restricted><Signup /></Restricted>} />
        <Route path='/signin' element={<Restricted><Signin /></Restricted>} />
        <Route path='/forgot' element={<Restricted><Forgot /></Restricted>} />
        <Route path='/otp' element={<Restricted><Otp_verification /></Restricted>} />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/resetpassword/:token' element={<Reset />} />
        <Route path='/product' element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;



