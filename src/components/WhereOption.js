import { useEffect, useState } from "react"
import { useWhereoptionsContext } from "./WhereoptionsContext"

const WhereOption = ()=>{
  const {whereoptions,setWhereoptions} = useWhereoptionsContext()
   const valuelocation =(e)=>{
    setWhereoptions(e.target.textContent)
   }

  const allwhere = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal"]
    return(
        <div className=" fixed  bg-white p-4 rounded-md shadow-md z-10 mt-14">
          <ul>
            {allwhere.map(wheres => <li className={`hover:cursor-pointer hover:bg-gray-300 rounded-lg `} onClick={valuelocation}>{wheres}</li>)}
          
    </ul>
  </div>
    )
}
export default WhereOption