
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInLoading, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from "react-redux"

export default function SignIn() {
  const { error, loading } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",

  })



  const handleChange = (e) => {
    setFormData((prev) => (
      { ...prev, [e.target.id]: e.target.value }))

  }
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      dispatch(signInLoading())
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  return (
    <div>
      <div className='max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
          <input onChange={handleChange} type="email" placeholder='email' id='email' className='p-3  border rounded-lg ' />
          <input onChange={handleChange} type="password" placeholder='password' id='password' className='p-3  border rounded-lg ' />
          <button disabled={loading} className='p-3 text-white bg-slate-700 uppercase hover:opacity-95 rounded-lg disabled:opacity-80'>{loading ? "Loading..." : "Sign in"}</button>

        </form>
        <div className='mt-3'>
          <p className='font-normal'>Dont have an account? <Link to="/sign-up" > <span className=' text-blue-700 font-semibold'>Sign up</span>  </Link></p>
        </div>
        {error && <p className='text-red-500 mt-5'>{error} </p>}
      </div>
    </div>
  )
}
