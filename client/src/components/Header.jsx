import { FaSearch } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function Header() {
   const { currentUser } = useSelector(state => state.user);

   return (
      <header className='bg-slate-200 shadow-md' >
         <div className='flex justify-between p-3 max-w-6xl mx-auto items-center'>
            <h1 className='font-bold text-sm sm:text-xl  flex flex-wrap'>
               <span className='text-slate-500'>Umar</span>
               <span className='text-slate-700' >Estate</span>
            </h1>
            <form className='bg-slate-100 rounded-lg p-3  flex  items-center'>
               <input type="text" name=""
                  className='bg-transparent  w-24 sm:w-64 focus:outline-none '
                  placeholder='Search...' />
               <FaSearch className="text-slate-600" />
            </form>
            <ul className="flex gap-4 items-center  text-slate-700  ">
               <Link to="/">
                  <li className="hidden sm:inline hover:underline" >Home</li>
               </Link>
               <Link to="/about">
                  <li className="hidden sm:inline hover:underline" >About</li>
               </Link>
               {currentUser ? <Link to="/profile">  <img src={currentUser.avatar} alt="profile"
                  className="w-7 h-7 object-cover  rounded-full"

               /></Link> :
                  <Link to="/sign-in">
                     <li className=" hover:underline" >Sign in</li>
                  </Link>
               }

            </ul>
         </div>
      </header>
   )
}
