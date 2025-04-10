'use client'
import { useState, useNavigate } from 'react'
import { handleRegister } from '../api/auth'

export default function Register() {
  const [error, setError] = useState(null)

  const [formData, setFormdata] = useState({
      student_email: '',
      student_password: '',
      student_major: '',
      student_firstName: '',
      student_lastName: '',
      student_year: '',
      student_termsAccepted: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(formData);  
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed, please try again.");
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
          value={formData.student_email}
          onChange={(e) => setFormdata({...formData, student_email: e.target.value})}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          type="password"
          placeholder="🔒 Enter your password..."
          value={formData.student_password}
          onChange={(e) => setFormdata({...formData, student_password: e.target.value})}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="📚 Enter your major..."
          value={formData.student_major}
          onChange={(e) => setFormdata({...formData, student_major: e.target.value})}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="📛 Enter your first name..."
          value={formData.student_firstName}
          onChange={(e) => setFormdata({...formData, student_firstName: e.target.value})}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="📛 Enter your last name..."
          value={formData.student_lastName}
          onChange={(e) => setFormdata({...formData, student_lastName: e.target.value})}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="🎉 Enter your year..."
          value={formData.student_year}
          onChange={(e) => setFormdata({...formData, student_year: e.target.value})}
        />
        <h2 className="font-sans text-gray-500 w-[20rem] text-sm">Use an organization Email to easily collaborate with teammates</h2>
      </div>
      <div className="space-x-2">
        <input
          type="checkbox"
          checked={formData.student_termsAccepted}
          onChange={(e) => setFormdata({...formData, student_termsAccepted: e.target.checked})}
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
