'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const handleLogin = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = (form.email).value
    const password = (form.password).value

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const cookieStore = await cookies();
      const access = cookieStore.get("accesstoken");

      const followUp = await fetch(`http://localhost:8080/auth/get-user-id/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      
      console.log(followUp)
      if (followUp.ok) {
        setSuccess(true)
        router.push("/repository"); 
      } else {
        const data = await response.json()
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Server error. Please try again.')
    }
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center mt-20 font-sans'>
        <h1 className="font-sans tracking-wide font-bold text-2xl">Think it. Make it.</h1>
        <h1 className="font-sans tracking-wide font-bold text-xl text-gray-400">Start Now!</h1>

        <form onSubmit={handleLogin}>
          <div className="mt-5 flex flex-col space-y-2">
            <label className="font-sans text-xs font-semibold">University Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="p-2 border border-gray-200 bg-gray-50 rounded-md w-[20rem]"
            />
            <label className="font-sans text-xs font-semibold">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="p-2 border border-gray-200 bg-gray-50 rounded-md w-[20rem]"
            />
            <h2 className="font-sans text-gray-500 w-[20rem] text-sm">
              Use an organization Email to easily collaborate with teammates
            </h2>
          </div>

          <button
            type="submit"
            className="bg-blue-500 mt-10 text-white w-[20rem] rounded-md font-sans font-light py-2"
          >
            Continue
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm w-[20rem] mt-5">{error}</p>
        )}
      </div>
    </>
  )
}
