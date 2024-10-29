{/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/otp' element={<Otp_verification/>}/>
        <Route element={<ResetProtect/>}>
            <Route path='/resetpassword/:token' element={<Reset/>}/>
        </Route>
        
        <Route element={<Protect/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/product' element={<Product/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter> */}

// import React, { useContext } from 'react'
// import { myappContext } from '../App'
// import { Navigate, Outlet, useNavigate } from 'react-router-dom'


// const ResetProtect = () => {
//     const{isReset}=useContext(myappContext)
//     const navigate=useNavigate()
    
//     return isReset?<Outlet/>:<Navigate to='/forgot'/>

//     }


// export default ResetProtect

import React from 'react'

const ProtectedRoute = () => {
  const
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute