import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "./UserDataContext";

const UserInfo = () => {
 const{userdata,setuserdata} = useUserData()

   const navigate = useNavigate()
   

  const logout = ()=>{
    localStorage.removeItem("jwtToken")
    navigate("/")
  }
    return (
        <>
            {userdata ? (
                <div className="fixed flex flex-col bg-gray-500">
                    <p>Name: {userdata.username}</p>
                    <p>Email: {userdata.email}</p> 
                    <button className="rounded-xl bg-blue-500 px-4" onClick={logout}>Logout</button>
                </div>
            ) : (
                <div className="fixed bg-gray-500">
                <p onClick={()=> navigate("/login")} className=" cursor-pointer">Sign In</p> 
                <p onClick={()=> navigate("/signup")} className=" cursor-pointer">Sign Up</p> 

                </div>
            )}
        </>
    );
};

export default UserInfo;
