import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username,setUsername] = useState("")
    const [number,setNumber] = useState(0)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const tokendata = localStorage.getItem("jwtToken")
    const navigate = useNavigate()
    useEffect(()=>{
      if(tokendata)
         {
             navigate("/")
         }
    },[tokendata])
    const submissiondata = async()=>{
        if(username && number && email && password){
    const response  =  await axios.post("http://localhost:7000/api/auth/register", {
            username:username,
            number:number,
            email:email,
            password:password})
            const token = response.data.token;
            localStorage.setItem("jwtToken", token);
        }
        else{
            console.log("no data")
        }
    //     if(!username || !number || !email || !password)
    //         {
    //     await axios.post("http://localhost:7000/api/auth/register", {
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
  <form onSubmit={submissiondata}>
    <h1>SignUp</h1>
    <h1>UserName</h1>
    <input type="text" className=" border" onChange={(e)=>setUsername(e.target.value)}></input>
    <h1>PhoneNo.</h1>
    <input type="number" className=" border" onChange={(e)=>setNumber(e.target.value)}></input>
    <h1>Email</h1>
    <input type="email" className=" border" onChange={(e)=>setEmail(e.target.value)}></input>
    <h1>Password</h1>
    <input type="password" className=" border" onChange={(e)=>setPassword(e.target.value)}></input>

    <input type="submit" className="border rounded-2xl p-4 ml-10"></input>
  </form>
 )
  
};

export default SignUp;
