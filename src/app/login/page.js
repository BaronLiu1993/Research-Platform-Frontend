'use client'
import { useState } from 'react'
import { handleLogin } from '../api/auth'
import Navbar from '../components/navbar'

export default function login() {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    })

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await handleLogin(formData)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

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
        <form onSubmit = {handleSubmit}>
          <div className = "mt-5 flex flex-col space-y-2">
            <label className = "font-sans text-xs font-semibold">University Email</label>
            <input value = {formData.email} onChange = {(e) => setFormData({...formData, email: e.target.value})} className = "p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]">
            </input>
            <label className = "font-sans text-xs font-semibold">Password</label>
            <input value = {formData.password} onChange = {(e) => setFormData({...formData, password: e.target.value})} className = "p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]">
            </input>
            
            <h2 className = "font-sans text-gray-500 w-[20rem] text-sm">Use an organization Email to easily collaborate with teammates</h2>
          </div>
          
          <button type = "submit" className = "bg-blue-500 mt-10 text-white w-[20rem] rounded-md font-sans font-light py-2">
            Continue
          </button>

        </form>
      </div>
        </>
    )
}