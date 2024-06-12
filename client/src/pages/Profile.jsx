import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function Profile() {
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0); // Default percentage to 0
  const [fileUploadError, setFileUploadError] = useState(false);
  const { currentUser } = useSelector(state => state.user);

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
          console.log(formData.avatar);
        });
      }
    );
  };




  return (
    <div className='max-w-lg flex flex-col mx-auto my-7'>
      <h1 className='text-3xl my-5 font-semibold text-center'>Profile</h1>
      <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} ref={fileRef} accept='image/.*' />
      <img
        onClick={() => fileRef.current.click()}
        className='w-24 mt-2 mb-5 self-center h-24 object-cover rounded-full'
        src={formData.avatar || currentUser.avatar}

        alt="Profile Avatar"
      />
      <p className='self-center font-medium my-4'>
        {fileUploadError ? <span className='text-red-700 '>Image upload failed!</span> :
          filePerc > 0 && filePerc < 100 ? <span className='text-slate-700 '>Uploading {filePerc}%</span>
            : filePerc === 100 ? <span className='text-green-700 '>Image successfully uploaded! </span> : ""}

      </p>
      <div className='grid space-y-5 max-w-xl'>
        <input type="text" placeholder='username' className='p-3 bg-transparent border focus:outline-none rounded-lg' />
        <input className='p-3 bg-transparent focus:outline-none rounded-lg border' type="email" placeholder='email' />
        <input type="text" placeholder='password' className='p-3 rounded-lg focus:outline-none bg-transparent border' />
        <button className='p-3 w-full text-white bg-slate-700 uppercase hover:opacity-95 rounded-lg disabled:opacity-80'>Sign in</button>
        <button className='p-3 w-full text-white bg-green-600 uppercase hover:opacity-95 rounded-lg disabled:opacity-80'>Update</button>
        <div className='flex justify-between text-red-600'>
          <p>Delete Account</p>
          <p>Sign out</p>
        </div>
        <p className='text-center text-green-600'>Show listings</p>
      </div>
    </div>
  );
}
