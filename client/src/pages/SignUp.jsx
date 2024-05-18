import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div>
      <div className='max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
        <form className=' flex flex-col gap-4'>
          <input type="text" placeholder='username' id='username' className='p-3  border rounded-lg ' />
          <input type="email" placeholder='email' id='email' className='p-3  border rounded-lg ' />
          <input type="password" placeholder='password' id='password' className='p-3  border rounded-lg ' />
          <button className='p-3 text-white bg-slate-700 uppercase hover:opacity-95 rounded-lg disabled:opacity-80'>Sign Up</button>
        </form>
        <div className='mt-3'>
          <p className='font-normal'>Have an account? <Link to="/sign-in" > <span className=' text-blue-700 font-semibold'>Sign in</span>  </Link></p>
        </div>
      </div>
    </div>
  )
}
