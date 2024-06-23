import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "./UserDataContext";
import LogIn from "./LogIn";
import SignUp from "./SingUp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserInfo = () => {
 const{userdata,setuserdata} = useUserData()
const [logintrue,setLogintrue] =useState(true)

   const navigate = useNavigate()
   

  const logout = (e)=>{
    e.preventDefault()

    localStorage.removeItem("jwtToken")
    toast.error("Logged Out", { 
        autoClose: 700,
       style: {
        background: "#F28C28",
        color:"white",
       }
       })
    navigate("/")
  }
    return (
        <div >
            {userdata ? (
                <div className="bg-white rounded-2xl flex flex-col ">
                   
                    <h1 className="bg-orange-500 text-lg text-white font-semibold p-3 text-center">User Details</h1>
                    <div className="flex flex-col p-3">
                    <h1 className="font-semibold mt-3 flex gap-1">Name: <span className=" underline font-normal ">{userdata.username}</span></h1>
                    <h1 className="font-semibold mt-3 flex gap-1">Email: <span className=" underline font-normal ">{userdata.email}</span></h1> 
                    <h1 className="font-semibold mt-3 flex gap-1">PhoneNo.: <span className=" underline font-normal ">{userdata.number}</span></h1> 
                   
                    <button className="rounded-xl bg-orange-600 p-4 text-white mt-5 mb-5" onClick={logout}>Logout</button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl ">
                {/* <p onClick={()=> navigate("/login")} className=" cursor-pointer">Sign In</p> 
                <p onClick={()=> navigate("/signup")} className=" cursor-pointer">Sign Up</p>  */}
                <div className="flex shadow-lg">
                <p onClick={()=> setLogintrue(true)} className={`cursor-pointer text-center  text-lg font-semibold p-3 flex-grow ${logintrue ? "bg-orange-500 text-white"  : "bg-white text-black"}`}>Login</p> 
                
                <p onClick={()=> setLogintrue(false)} className={`cursor-pointer text-center text-lg font-semibold p-3 flex-grow ${logintrue ? "bg-white text-black" : "bg-orange-500 text-white"}`}>Sign Up</p> 
                </div>
                  {logintrue ? <LogIn/> : <SignUp/>}

                </div>
            )}
        </div>
    );
};

export default UserInfo;
