import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess } from "../redux/user/userSlice";
import axios from "axios"

export default function Profile() {
  const fileRef = useRef();
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
    console.log("1");
    dispatch(updateUserStart())
    fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formData
      })
    })

      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        console.log("2");
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true)
      })
      .catch(error => {
        dispatch(updateUserFailure(error.message))
        console.error('Error:', error);
      });


  };


  return (
    <div className='max-w-lg flex flex-col mx-auto my-7'>
      <h1 className='text-3xl my-5 font-semibold text-center'>Profile</h1>
      <form  >
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
            onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })}
          />
          <input type="password"
            id='password'
            placeholder='password'
            className='p-3 rounded-lg focus:outline-none bg-transparent border'
            onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })}

          />

          <button
            onClick={handleSubmit}

            className='p-3 w-full
            text-white bg-green-600 uppercase hover:opacity-95 rounded-lg disabled:opacity-80'>

            Update
          </button>

          <div className='flex justify-between text-red-600'>
            <p>Delete Account</p>
            <p>Sign out</p>
          </div>

          <p className='text-center text-green-600'>Show listings</p>
        </div>
      </form>


      <p className='text-center text-red-600'> {error ? error : ""}  </p>
      <p className='text-center text-green-600'> {updateSuccess ? "Profile updated successfully" : ""}  </p>



    </div >
  );
}
