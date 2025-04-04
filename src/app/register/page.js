'use client'
import { useState } from 'react'
import { supabase } from '../utils/supabase/auth'
export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [major, setMajor] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [year, setYear] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState(null)

  const handleRegister = async () => {
    if (termsAccepted && email && major && firstName && lastName && year && password) {
      try {
        const { user, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);  
          return;
        }

        const { data, error: dbError } = await supabase
          .from('users') 
          .insert([
            {
              email: user.email,
              major: major,
              first_name: firstName,
              last_name: lastName,
              year: year,
              accepted_terms: true, 
            },
          ]);

        if (dbError) {
          setError(dbError.message); 
          return;
        }

        console.log('User registered and data stored successfully!');
      } catch (error) {
        console.error('Error registering user: ', error);
        setError(error.message);  // Display the error message
      }
    } else {
      alert('Please fill out all fields and accept the terms.');
    }
  }

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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          type="password"
          placeholder="🔒 Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="📚 Enter your major..."
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="📛 Enter your first name..."
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="📛 Enter your last name..."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="p-2 border-1 border-gray-200 rounded-md w-[20rem]"
          placeholder="🎉 Enter your year..."
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <h2 className="font-sans text-gray-500 w-[20rem] text-sm">Use an organization Email to easily collaborate with teammates</h2>
      </div>
      <div className="space-x-2">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <label className="font-sans text-md text-gray-400 text-sm">Agree to the Terms and Conditions</label>
      </div>
      <button
        className="bg-blue-500 mt-10 text-white w-[20rem] rounded-md font-sans py-2"
        onClick={handleRegister}
      >
        Continue
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}
