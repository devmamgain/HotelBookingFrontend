import { Link, useNavigate } from "react-router-dom"
import SearchHotel from "./SearchHotel"
import { useState } from "react"
import UserInfo from "./UserInfo"

const NavBar = ()=>{
    const [showtrue,setShowtrue] = useState(false)
    const [mentrue,setMenutrue] = useState(false)
     const navigate = useNavigate()
    return(
        <>
        <nav className="flex p-3 bg-white border-gray-200 dark:bg-gray-900bg-slate-500 border-b">
       
        <h1 className="font-bold text-3xl text-orange-500 ml-40 hover:cursor-pointer">
     <Link to="/">TravelO </Link>
        </h1>
        <div className="flex-grow flex content-center justify-center">
        <SearchHotel/>
        </div>
        <div className="flex ml-auto mr-40 gap-10">
        <div onMouseEnter={()=>setMenutrue(true)}  onMouseLeave={()=>setMenutrue(false)}>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             className="w-8 h-8 hover:cursor-pointer hover:bg-slate-500 rounded-lg transition duration-500 active:transition-none active:bg-zinc-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {mentrue && <div className="fixed">
                <h1 onClick={()=>navigate("/wishlist")}>Wishlist</h1>
                <h1 onClick={()=>navigate("/orders")}>Orders</h1>

                </div>}          

            </div>
            <div onMouseEnter={()=>setShowtrue(true)}  onMouseLeave={()=>setShowtrue(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
            className="w-6 h-6 mt-1 hover:cursor-pointer hover:bg-slate-500 rounded-3xl transition duration-500 active:transition-none active:bg-zinc-600" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            {showtrue && <div className="fixed"  ><UserInfo /></div>}          
              </div>
       </div>
        </nav>
               </>

    )
}

export default NavBar