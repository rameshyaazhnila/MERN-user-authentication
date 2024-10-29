
import { Check, X } from 'lucide-react';
import React from 'react'

const PasswordStrength = ({password,setstrengthMeter}) => {
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
        if (pass.match(/\d/)) strength++;
        if (pass.match(/[^A-Za-z0-9]/)) strength++;
        return strength;
    };
    

    const getColor=(StrengthColor)=>{
        if(StrengthColor==0) return "bg-blue-500";
        if(StrengthColor==1) return "bg-red-400";
        if(StrengthColor==2) return "bg-pink-500";
        if(StrengthColor==3) return "bg-yellow-500";
        return "bg-green-500";
    }

    const getInfo=(StrengthInfo)=>{
        if(StrengthInfo==0) return "very weak";
        if(StrengthInfo==1) return "weak";
        if(StrengthInfo==2) return "fair";
        if(StrengthInfo==3) return "good";
        return "Strong";
    }
   
    const criteria = [
        { label: "At Least 6 Characters", met: password.length >= 6 },
        { label: "Contains Uppercase Letters", met: /[A-Z]/.test(password) },
        { label: "Contains Lowercase Letters", met: /[a-z]/.test(password) },
        { label: "Contains a Number", met: /\d/.test(password) },
        { label: "Contains Special Character", met: /[^A-Za-z0-9]/.test(password) }
    ];

    const Strength=getStrength(password)
    setstrengthMeter(Strength)

  return (
    <div>
      <div className='text-gray-800 flex justify-between items-center'>
        <h2 className='pl-2'>Password Strength</h2>
        <h2>{getInfo(Strength)}</h2>
      </div>
      <div className='flex flex-col gap-y-3'>
      <div className='flex justify-center items-center'>
      {[...Array(4)].map((_,index)=><div key={index} className={`h-1 rounded-full ml-2 w-1/4 ${Strength<=index?"bg-white":getColor(Strength)}`}></div>)}
    </div>
    <div>{criteria.map((item,index)=>(<div key={index} className='flex mb-1'><div>{item.met?<Check className='text-green-700'/>:<X className='text-red-700'/>}</div><span className={`pl-1 ${item.met?'text-green-700':'text-red-700'}`}>{item.label}</span></div>))}</div>
    </div>
    </div>
    

  )
}

export default PasswordStrength

