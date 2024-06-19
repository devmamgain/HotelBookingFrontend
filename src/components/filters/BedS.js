import { useState } from "react"

const BedS = ({beds})=>{
    const [color,setColor] = useState(false)
    const colortogray = ()=>{
     setColor(true)
     
    }
     return(
     <div className={`border-2 border-black w-9 h-7 text-center hover:cursor-pointer ${color ? "bg-gray-300" : ""} hover:bg-gray-300 rounded-lg`} onClick={colortogray}>
      {beds}
     </div>
         )
}
export default BedS