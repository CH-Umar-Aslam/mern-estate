
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
export default function SignUp() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",

  })



  const handleChange = (e) => {
    setFormData((prev) => (
      { ...prev, [e.target.id]: e.target.value }))

  }
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json();
    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate("/sign-in")
  }
  return (
    <div>
      <div className='max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
        <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
          <input onChange={handleChange} type="text" placeholder='username' id='username' className='p-3  border rounded-lg ' />
          <input onChange={handleChange} type="email" placeholder='email' id='email' className='p-3  border rounded-lg ' />
          <input onChange={handleChange} type="password" placeholder='password' id='password' className='p-3  border rounded-lg ' />
          <button disabled={loading} className='p-3 text-white bg-slate-700 uppercase hover:opacity-95 rounded-lg disabled:opacity-80'>{loading ? "Loading..." : "Sign up"}</button>
          <OAuth />
        </form>
        <div className='mt-3'>
          <p className='font-normal'>Have an account? <Link to="/sign-in" > <span className=' text-blue-700 font-semibold'>Sign in</span>  </Link></p>
        </div>
        {error && <p className='text-red-500 mt-5'>{error} </p>}
      </div>
    </div>
  )
}
