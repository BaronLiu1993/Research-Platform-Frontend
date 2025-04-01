export default function register () {
    return (
        <>
        <div className = 'flex flex-col justify-center items-center mt-20'>
        <h1 className="font-sans space-x-0.5 tracking-wide font-bold text-2xl">
          Think it. Make it.
        </h1>
        <h1 className="font-sans space-x-0.5 tracking-wide font-bold text-xl text-gray-400 ">
          Start Now!
        </h1>
        <div className = "mt-5 flex flex-col space-y-2">
          <input className = "p-2 border-1 border-gray-200 rounded-md w-[20rem]" placeholder = "📨 Enter your email address...">

          </input>
          <input className = "p-2 border-1 border-gray-200 rounded-md w-[20rem]" placeholder = "📚 Enter your major...">

          </input>
          <input className = "p-2 border-1 border-gray-200 rounded-md w-[20rem]" placeholder = "📛 Enter your first name...">

          </input>
          <input className = "p-2 border-1 border-gray-200 rounded-md w-[20rem]" placeholder = "📛 Enter your last name...">

          </input>
          <input className = "p-2 border-1 border-gray-200 rounded-md w-[20rem]" placeholder = "🎉 Enter your year...">

          </input>
          <h2 className = "font-sans text-gray-500 w-[20rem] text-sm">Use an organization Email to easily collaborate with teammates</h2>
        </div>
        <div className = 'space-x-2'>
          <input type = "checkbox"/>
          <label className = "font-sans text-md text-gray-400 text-sm">Agree to the Terms and Conditions</label>
        </div>
        
        <button className = "bg-blue-500 mt-10 text-white w-[20rem] rounded-md font-sans py-2">
          Continue
        </button>
      </div>
        </>
    );
}