import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess, deleteUserFailure, deleteUserSuccess, deleteUserStart } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0); // Default percentage to 0
  const [fileUploadError, setFileUploadError] = useState(false);
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false)
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));

      },
      (error) => {
        setFileUploadError(true);

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          // Assuming setFormData is defined somewhere to update the form data

          setFormData({ ...formData, avatar: downloadURL });

        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password == "") {
      alert("please enter your email ")
      return;
    }

    try {

      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData
        })
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
    }
    catch (error) {
      dispatch(updateUserFailure(error.message))
      console.log(error);
    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch(`/api/user/sign-out/${currentUser._id}`)
      const data = await res.json()
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
      }
      dispatch(signOutUserSuccess(data))
      navigate("/sign-in")
    } catch (error) {
      dispatch(signOutUserFailure(data.message))

    }
  }

  const deleteAccount = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
      }

      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(data.message))
    }

  }


  return (
    <div className='max-w-lg flex flex-col mx-auto my-7'>
      <h1 className='text-3xl my-5 font-semibold text-center'>Profile</h1>
      <form
        onSubmit={handleSubmit}
      >
        <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} ref={fileRef} accept='image/.*'
        />


        <img
          onClick={() => fileRef.current.click()}
          className='w-24 mt-2 mb-5 mx-auto  h-24 object-cover rounded-full'
          src={formData?.avatar || currentUser.avatar}

          alt="Profile Avatar"
        />

        <p className='text-center font-medium my-4'>
          {fileUploadError ? <span className='text-red-700 '>Image upload failed!</span> :
            filePerc > 0 && filePerc < 100 ? <span className='text-slate-700 '>Uploading {filePerc}%</span>
              : filePerc === 100 ? <span className='text-green-700  '>Image successfully uploaded! </span> : ""}

        </p>

        <div className='grid space-y-5 max-w-xl'>
          <input type="text"
            id="username"
            placeholder='username'
            className='p-3 bg-transparent border focus:outline-none rounded-lg'
            defaultValue={currentUser.username}
            onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })}
          />

          <input className='p-3 bg-transparent focus:outline-none rounded-lg border' type="email"
            id="email"
            placeholder='email'
            defaultValue={currentUser.email}
            onChange={(e) => {
              if (e.target.value === "" || e.target.value === " ") {
                return
              } else {
                return setFormData({ ...formData, [e.target.id]: e.target.value })
              }
            }}
          />
          <input type="password"
            id='password'
            placeholder='password'
            className='p-3 rounded-lg focus:outline-none bg-transparent border'
            onChange={(e) => {
              if (e.target.value === "" || e.target.value === " ") {
                return
              } else {
                return setFormData({ ...formData, [e.target.id]: e.target.value })
              }
            }}

          />


          <button


            className='p-3 w-full text-white bg-green-600 uppercase hover:opacity-95 rounded-lg disabled: opacity-80'>

            Update
          </button>

        </div>

      </form >


      <div className='flex justify-between text-red-600'>
        <p onClick={deleteAccount}>Delete Account</p>
        <p onClick={handleSignOut} >Sign out</p>
      </div>

      <p className='text-center text-green-600'>Show listings</p>


      <p className='text-center text-red-600'> {error ? error : ""}  </p>
      <p className='text-center text-green-600'> {updateSuccess ? "Profile updated successfully" : ""}  </p>



    </div >
  );
}
