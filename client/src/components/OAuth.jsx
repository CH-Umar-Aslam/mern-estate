import React from 'react'
import { app } from "../firebase.js"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signInSuccess } from "../redux/user/userSlice.js"
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),

      })
      const data = await res.json();
      dispatch(signInSuccess(data));
      console.log(result);
      navigate("/")

    } catch (error) {
      console.log("couldn't sign in with Google", error);
    }
  }
  return (
    <div>
      <button onClick={handleGoogleClick} type='button' className='bg-red-600 w-full rounded-xl  uppercase  hover:opacity-95 p-3 text-white  ' >
        Continue with google </button>
    </div>
  )
}

export default OAuth