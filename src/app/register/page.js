'use client';

//Libraries
import { useActionState } from 'react';

//Server Action
import registerActions from './registerActions';

//Components
import DropdownMajor from '../components/dropdowns/dropdownmajor'
import DropdownInterests from '../components/dropdowns/dropdowninterests'
import DropdownYear from '../components/dropdowns/dropdownyear'
import VerifyOtp from './verify'

export default function Register() {
  const [state, formAction] = useActionState(registerActions, { error: null, success: false})
  return (
    <>
      <div className='flex flex-col justify-center items-center mt-20'>
        <div>
          <h1 className="font-sans space-x-0.5 tracking-wide font-semibold text-2xl">
            Think it. Make it.
          </h1>
          <h1 className="font-sans space-x-0.5 tracking-wide font-semibold text-2xl text-gray-400 ">
            Explore Research at UofT
          </h1>
        </div>

        {state.success ? <VerifyOtp /> : 
        <form action = {formAction} className="mt-5 flex flex-col space-y-2">
          <div className="flex justify-center items-center space-x-2">
            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">University Email</label>
              <input
                className="p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]"
                name = "student_email"
                id = "student_email"
                type = "email"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">Password</label>
              <input
                className="p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]"
                name = "student_password"
                id = "student_password"
                type = "password"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">First Name</label>
              <input
                className="p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]"
                name = "student_firstname"
                id = "student_firstname"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">Last Name</label>
              <input
                className="p-2 border-1 border-gray-200 bg-gray-50 rounded-md w-[20rem]"
                name = "student_lastname"
                id = "student_lastname"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">Year</label>
              <DropdownYear
                className="w-[20rem]"
                name = "student_year"
                id = "student_year"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-sans text-xs font-semibold">Major</label>
              <DropdownMajor
                className="w-[20rem]"
                name = "student_major"
                id = "student_major"
              />
            </div>
          </div>

          <div className="space-x-2 space-y-4 mt-4 flex flex-col">
          <div >
            <DropdownInterests
              name = "student_interests"
              id = "student_interests"
            />
          </div>
          <div className = "space-x-2 flex">
            <input
              type="checkbox"
              name = "student_acceptedterms"
              id = "student_acceptedterms"
            />
            <label className="font-sans text-md text-gray-400 text-sm">
              Agree to the Terms and Conditions
            </label>
          </div>
          
        </div>
        <button
          className="bg-blue-500 active:bg-blue-400 hover:bg-blue-600 mt-5 text-white w-[20rem] rounded-md font-light font-sans py-2"
        >
          Continue
        </button>
      </form>
      }
      </div>
    </>
  );
}
