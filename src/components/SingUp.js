import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
    const [username,setUsername] = useState("")
    const [number,setNumber] = useState(0)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const tokendata = localStorage.getItem("jwtToken")
    const apimainurl = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate()
    useEffect(()=>{
      if(tokendata)
         {
             navigate("/")
         }
    },[tokendata])
    const submissiondata = async(e)=>{
        e.preventDefault()
        if(username && number && email && password){
    const response  =  await axios.post(apimainurl+"/auth/register", {
            username:username,
            number:number,
            email:email,
            password:password})
            const token = response.data.token;
            localStorage.setItem("jwtToken", token);
            toast.success("Account Created Successfully", { 
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
    <h1 className="text-lg font-semibold text-center">Sign Up</h1>
    <div className=" flex flex-col ">
  
    <h1 >UserName <span className="text-red-500">*</span></h1>
    <input type="text" className="focus:outline-none  border-b" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}></input>
   <h1 className="mt-5">PhoneNo. <span className="text-red-500">*</span></h1>
    <input type="number" className="focus:outline-none  border-b" placeholder="Number" onChange={(e)=>setNumber(e.target.value)}></input>
<h1 className="mt-5">Email <span className="text-red-500">*</span></h1>
    <input type="email" className="focus:outline-none  border-b"  placeholder="Email" onChange={(e)=>setEmail(e.target.value)}></input>
    

    <h1 className="mt-5">Password <span className="text-red-500">*</span></h1>
    <input type="password" className="focus:outline-none  border-b" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}></input>
   

    <input type="submit" className="border rounded-lg p-4 mt-5 bg-orange-600 mb-4 text-white text-xl"></input>
    </div>
  </form>
 )
  
};

export default SignUp;
