
import axios from 'axios';
import {create} from 'zustand'

axios.defaults.withCredentials=true
const API_USER ="https://mern-user-authentication.onrender.com";
const userStore=create((set)=>({
    user:null,
    error:null,
    isAuth:false,
    isLoading:false,
    isChecking:true,


    signup: async(username,email,password)=>{
        try {
            set({isLoading:true,error:null})
            await axios.post(`${API_USER}create/`,{username,email,password})
            set({isLoading:false}) //this is not update please correct it
        } catch (error) {
        
            set({error:error.response?.data || "An error occured",isLoading:false})
            throw error
            
        }
    },
    signin: async(email,password)=>{
        try {
            set({isLoading:true,error:null})
            const res=await axios.post(`${API_USER}login/`,{email,password})
            set({isLoading:false,isAuth:true,user:res.data.user})//user:res.data.user
        } catch (error) {
        
            set({error:error.response.data.email_error,isLoading:false})
            throw error
            
        }
    },
    resetAction:()=>{
        set({error:null,isLoading:false})
    },
    emailOTP:async(otp)=>{
        try {
            set({error:null,isLoading:true,isAuth:false})
            const res=await axios.post(`${API_USER}verify/otp`,{otp})
            set({isAuth:res.data.isVerified,isLoading:false})

        } catch (error) {
            set({error:error.message||"invalid cridential",isLoading:false,isAuth:false})
            throw error
        }
    },
    logout:async()=>{
        try {
            await axios.get(`${API_USER}logout/`)
            set({user:null,isAuth:false})
        } catch (error) {
            set({error:"server error"})
        }
    },
    checkAuth:async()=>{
        try {
            set({error:null,isChecking:true})
            const res= await axios.get(`${API_USER}verify/auth`)
            set({isAuth:true,user:res.data.userInfo,error:null,isChecking:false})
            console.log("Auth check success, user info zustand:", res.data.userInfo);
        
        } catch (error) {
            set({isAuth:false,isChecking:false})
            console.log("zustand error: THIS IS THE FALS MESSAGE ",error);
            
            
            
            
            
        }

    }
    

}));
export default userStore;


