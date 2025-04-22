'use client'

import { useState } from 'react'
import { verifyOtp, resendCode } from "../api/auth"


export default function VerifyOtp ({ email}) {
    const [code, setCode] = useState('');
    async function handleVerify () {
        try {
          await verifyOtp({ email, code });
          setVerified(true);
          setError('');
        } catch (err) {
          console.error('Invalid code. Please try again.');
        }
      };
    

    return (
        <>
        <div className = "flex flex-col mt-20">
                <label className = "font-sans text-xs font-semibold">Verification Code</label>
                <div className = "flex">
                    <input
                    className="p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    />
                    
                </div>
                <p className = "font-sans text-xs mt-4">We Sent a Verification Code to You!</p>
                <button
                    className="bg-blue-500 active:bg-blue-400 hover:bg-blue-600 mt-5 text-white w-[20rem] rounded-md font-light font-sans py-2"
                >
                Continue
                </button>
          </div>
        </>
    )
}