import { useEffect, useState } from "react"
import { useFiltersContext } from "./FiltersContext"

const BedRooms = ({bedrooms})=>{
   const [color,setColor] = useState(false)
   const {filtersbedrooms,setFiltersbedrooms} = useFiltersContext()

   const colortogray = (e)=>{
    setColor(true)
    // console.log(e)
    // setFiltersbedrooms(e)
   }
    return(
    <div className={`border-2 border-black w-9 h-7 text-center hover:cursor-pointer ${color ? "bg-gray-300" : ""} hover:bg-gray-300 rounded-lg`} onClick={()=>colortogray(bedrooms)}>
     {bedrooms}
    </div>
        )
}
export default BedRooms