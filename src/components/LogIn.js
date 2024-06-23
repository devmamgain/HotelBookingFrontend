import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LogIn = () => {
    const apimainurl = process.env.REACT_APP_BACKEND_URL;

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
   const tokendata = localStorage.getItem("jwtToken")
   useEffect(()=>{
     if(tokendata)
        {
            navigate("/")
        }
   },[tokendata])
    const submissiondata = async(e)=>{
        e.preventDefault()
        if(email && password){
       const response = await axios.post(apimainurl+"/auth/login", {
          
            email:email,
            password:password
        })
            const token = response.data.token;
            localStorage.setItem("jwtToken", token);
            toast.success("Logged in", { 
                autoClose: 700,
               style: {
                background: "#F28C28",
                color:"white",
               }
               })
            navigate("/")
          
        }
        else{
            console.log("no data")
        }
    //     if(!username || !number || !email || !password)
    //         {
    //     await axios.post(apimainurl+"/auth/register", {
    //       username:username,
    //       number:number,
    //       email:email,
    //       password:password
    //     })
    // }
    // else{
    //     console.log("fill values")
    // }
    }
 return(
  <form onSubmit={submissiondata} className="mt-3 ml-4 mr-4 ">
    <div className="flex flex-col ">
    <h1 className="text-xl font-semibold text-center">Login</h1>
   <h1>Email <span className="text-red-500">*</span></h1>
    <input type="email" placeholder="Email" className="focus:outline-none  border-b" onChange={(e)=>setEmail(e.target.value)}></input>
    <h1 className="mt-5">Password <span className="text-red-500">*</span></h1>
    <input type="password" placeholder="Password" className="focus:outline-none  border-b" onChange={(e)=>setPassword(e.target.value)}></input>
   <input type="submit" className="border rounded-lg p-4 mt-5 bg-orange-600 mb-4 text-white text-xl"></input>
   </div>
  </form>
 )
  
};

export default LogIn;
