'use client';

import { useState } from 'react'
import { handleRegister } from '../api/auth'
import DropdownMajor from '../components/dropdowns/dropdownmajor'
import DropdownInterests from '../components/dropdowns/dropdowninterests'
import DropdownYear from '../components/dropdowns/dropdownyear'
import Navbar from '../components/navbar'
import VerifyOtp from '../components/verify'

export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    student_email: '',
    student_password: '',
    student_major: '',
    student_firstname: '',
    student_lastname: '',
    student_year: '',
    student_interests: [],
    student_acceptedterms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleRegister(formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <Navbar />
      <form className='flex flex-col justify-center items-center mt-20'>
        <div>
          <h1 className="font-sans space-x-0.5 tracking-wide font-semibold text-2xl">
            Think it. Make it.
          </h1>
          <h1 className="font-sans space-x-0.5 tracking-wide font-semibold text-2xl text-gray-400 ">
            Explore Research at UofT
          </h1>
        </div>

        {submitted ? <VerifyOtp /> : 
        <div className="mt-5 flex flex-col space-y-2">
          <div className="flex justify-center items-center space-x-2">
            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">University Email</label>
              <input
                className="p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]"
                value={formData.student_email}
                onChange={(e) => setFormData({ ...formData, student_email: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">Password</label>
              <input
                className="p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]"
                type="password"
                value={formData.student_password}
                onChange={(e) => setFormData({ ...formData, student_password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">First Name</label>
              <input
                className="p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]"
                value={formData.student_firstname}
                onChange={(e) => setFormData({ ...formData, student_firstname: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">Last Name</label>
              <input
                className="p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]"
                value={formData.student_lastname}
                onChange={(e) => setFormData({ ...formData, student_lastname: e.target.value })}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">Year</label>
              <DropdownYear
                className="w-[20rem]"
                value={formData.student_year}
                onChange={(selectedValue) =>
                  setFormData((prev) => ({ ...prev, student_year: selectedValue }))
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">Major</label>
              <DropdownMajor
                className="w-[20rem]"
                value={formData.student_major}
                onChange={(selectedValue) =>
                  setFormData((prev) => ({ ...prev, student_major: selectedValue }))
                }
              />
            </div>
          </div>

          <div className="space-x-2 space-y-4 mt-4 flex flex-col">
          <div>
            <label className="font-sans text-xs font-semibold">Research Interests</label>
            <DropdownInterests
              value={formData.student_interests}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, student_interests: selected }))
              }
            />
          </div>
          <div className = "space-x-2 flex justify-center items-center">
            <input
              type="checkbox"
              checked={formData.student_acceptedterms}
              onChange={(e) => setFormData({ ...formData, student_acceptedterms: e.target.checked })}
            />
            <label className="font-sans text-md text-gray-400 text-sm">
              Agree to the Terms and Conditions
            </label>
          </div>
          
        </div>
      </div>
      }
      <button
        className="bg-blue-500 active:bg-blue-400 hover:bg-blue-600 mt-5 text-white w-[20rem] rounded-md font-light font-sans py-2"
        onClick={handleSubmit}
      >
        Continue
      </button>
        

      </form>
    </>
  );
}
