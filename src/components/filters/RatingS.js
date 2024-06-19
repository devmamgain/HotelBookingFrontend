import { useState } from "react"

const RatingS = ({rating})=>{
    const [color,setColor] = useState(false)
    const colortogray = ()=>{
     setColor(true)
    }
     return(
     <div className={`border-2 border-black w-16 h-11 text-center hover:cursor-pointer ${color ? "bg-gray-300" : ""} hover:bg-gray-300 rounded-lg`} onClick={colortogray}>
      {rating} & Up
     </div>
     )
}
export default RatingS