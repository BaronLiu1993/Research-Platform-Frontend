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
        <div className = "flex flex-col">
                <label className = "font-sans text-xs font-semibold">Verification Code</label>
                <div className = "flex">
                    <input
                    className="p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    />
                    <button             
                        onClick={handleVerify}
                        className = "ml-5 text-3xl">
                    →
                    </button>
                </div>
                <a href = "#" className = "font-sans text-xs text-blue-500">Resend Verfication Code</a>
                <p className = "font-sans text-xs mt-4">We Sent a Verification Code to You!</p>
          </div>
        </>
    )
}