'use client'

import { useActionState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import Navbar from '../components/navbar'
import loginAction from './loginActions' 

export default function login() {
  const [state, formAction] = useActionState(loginAction, { error: null, success: false })
  useEffect(() => {
    if (state.success) {
      redirect('/')
    }
  }, [state.success])
  return (
        <>  
          <Navbar />
            <div className = 'flex flex-col justify-center items-center mt-20'>
              <h1 className="font-sans space-x-0.5 tracking-wide font-bold text-2xl">
                Think it. Make it.
              </h1>
              <h1 className="font-sans space-x-0.5 tracking-wide font-bold text-xl text-gray-400 ">
                Start Now!
              </h1>
              <form action = {formAction}>
                <div className = "mt-5 flex flex-col space-y-2">
                  <label className = "font-sans text-xs font-semibold">University Email</label>
                  <input id = "email" name = "email" type = "email" className = "p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]">
                  </input>
                  <label className = "font-sans text-xs font-semibold">Password</label>
                  <input id = "password" name = "password" type = "password" className = "p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]">
                  </input>
                  <h2 className = "font-sans text-gray-500 w-[20rem] text-sm">Use an organization Email to easily collaborate with teammates</h2>
                </div>
                
                <button type = "submit" className = "bg-blue-500 mt-10 text-white w-[20rem] rounded-md font-sans font-light py-2">
                  Continue
                </button>

              </form>
              {state?.error && (
                <p className="text-red-500 open-sans text-sm w-[20rem] mt-5">{state.error}</p>
              )}
            </div>
            
        </>
    )
}