import React from 'react'

const CreateListing = () => {
  return (
    <main className='max-w-4xl py-5 mx-auto p-3'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form className='flex  flex-col sm:flex-row gap-8  '>
        <div className='flex-1 flex flex-col   gap-4'>
          <input type="text" id="name" maxLength={20} minLength={4} placeholder='Name' className='border p-3 rounde-lg '
            required />
          <textarea type="text" id="description" placeholder='Description' className='border p-3 rounde-lg ' maxLength={62} minLength={10}
            required />
          <input type="text" id="address" placeholder='Address' className='border p-3 rounde-lg '
            required />

          <div className='flex gap-6 flex-wrap'>
            <div>
              <input type="checkbox" id='sale' className='w-5' /> <span>Sell</span>
            </div>
            <div>
              <input type="checkbox" id='rent' className='w-5' /> <span>Rent</span>
            </div>
            <div>
              <input type="checkbox" id='parking' className='w-5' /> <span>Parking spot</span>
            </div>
            <div>
              <input type="checkbox" id='furnished' className='w-5' /> <span>Furnished</span>
            </div>

            <div>
              <input type="checkbox" id='other' className='w-5' /> <span>Other</span>
            </div>

          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-6 sm:gap-12 my-3'>
              <div className='flex items-center gap-1'>
                <input type="number" className='border w-14 rounded-lg  p-3 border-gray-300' min={1} max={10} id='bedrooms' /> <span>Rooms</span>
              </div>
              <div className='flex  items-center gap-1'>
                <input type="number" className='border w-14 rounded-lg p-3 border-gray-300' min={1} max={5} id='bathrooms' /> <span>Baths</span>
              </div>
            </div>
            <div className='flex gap-2 flex-wrap '>
              <input type="number" className='border rounded-lg w-36 p-3 border-gray-300' min={1} max={10} id='regularPrice' />
              <div className=''>
                <span>Regular Price</span> <br />
                <span className='text-xs pl-4'>($ / month)</span>
              </div>
            </div>
            <div className='flex gap-2 flex-wrap '>
              <input type="number" className='border rounded-lg w-36 p-3 border-gray-300' min={1} max={10} id='discountPrice' />
              <div className=''>
                <span>Discounted Price</span> <br />
                <span className='text-xs pl-7'>($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className='mb-3'><span className='font-semibold' accept="images/*" multiple>Images:</span> The first image will be the cover (max 6)</h3>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <input type="file" className='p-3 border border-gray-300' />
            <button className=' text-green-700 hover:shadow-lg text-normal  rounded-lg border border-green-800 p-3 '>
              Upload
            </button>
          </div>
          <br />
          <button className='bg-gray-600 text-white w-full p-3 rounded-lg sm:mt-2 font-normal text-lg'>Create Listing</button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing