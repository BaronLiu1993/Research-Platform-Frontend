'use client'
import { useState } from 'react'
import { handleRegister } from '../api/auth'

export default function Register() {
  const [error, setError] = useState(null)

  const [formData, setFormdata] = useState({
    email: '',
    password: '',
    major: '',
    firstName: '',
    lastName: '',
    year: '',
    termsAccepted: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(formData);  
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  
  return (
    <div className='flex flex-col justify-center items-center mt-20'>
      <h1 className="font-sans space-x-0.5 tracking-wide font-bold text-2xl">
        Think it. Make it.
      </h1>
      <h1 className="font-sans space-x-0.5 tracking-wide font-bold text-xl text-gray-400 ">
        Start Now!
      </h1>
      <div className="mt-5 flex flex-col space-y-2">
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="📨 Enter your email address..."
          value={email}
          onChange={(e) => setFormdata({...FormData, username: e.target.value})}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          type="password"
          placeholder="🔒 Enter your password..."
          value={password}
          onChange={(e) => setFormdata({...FormData, password: e.target.value})}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="📚 Enter your major..."
          value={major}
          onChange={(e) => setFormdata({...FormData, major: e.target.value})}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="📛 Enter your first name..."
          value={firstName}
          onChange={(e) => setFormdata({...FormData, firstName: e.target.value})}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="📛 Enter your last name..."
          value={lastName}
          onChange={(e) => setFormdata({...FormData, lastName: e.target.value})}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="🎉 Enter your year..."
          value={year}
          onChange={(e) => setFormdata({...FormData, year: e.target.value})}
        />
        <h2 className="font-sans text-gray-500 w-[20rem] text-sm">Use an organization Email to easily collaborate with teammates</h2>
      </div>
      <div className="space-x-2">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setFormdata({...FormData, termsAccepted: e.target.checked})}
        />
        <label className="font-sans text-md text-gray-400 text-sm">Agree to the Terms and Conditions</label>
      </div>
      <button
        className="bg-blue-500 mt-10 text-white w-[20rem] rounded-md font-sans py-2"
        onClick={handleSubmit}
      >
        Continue
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}
