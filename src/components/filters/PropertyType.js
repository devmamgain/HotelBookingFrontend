import { useState } from "react"

const PropertyType=({property})=>{
    const [color,setColor] = useState(false)
    const colortogray = ()=>{
     setColor(true)
    }
     return(
     <div className={`border-2 border-black w-32 h-32 text-center hover:cursor-pointer ${color ? "bg-gray-300" : ""} hover:bg-gray-300 rounded-lg`} onClick={colortogray}>
      {property}
     </div>
     )
}
export default PropertyType