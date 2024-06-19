import axios from "axios"
import { useEffect, useState } from "react"
import InCategories from "./InCategories"
import { useCategory } from "./CategoryContext"

const Categories = ()=>{
    const [catedata,setCatedata]= useState([])
    const [numbercatedata,setNumbercatedata] = useState(0)
    const [fullcatedata,setFullcatedata]= useState([])
    const {hotelcategory,setHotelcategory} = useCategory()
    useEffect(()=>{
    const catedata = async()=>{
        const data = await axios.get("http://localhost:7000/api/category")
        const maindata = data.data
        setFullcatedata(maindata)
        setCatedata(maindata.slice(numbercatedata,numbercatedata+10))
    }
    catedata()
    },[numbercatedata])
    const loadmore =()=>{
setNumbercatedata(prev =>prev+1)   
}
const backmore =()=>{
    setNumbercatedata(prev=>prev-1)

}
const handleCategoryClick = (catedatas)=>{
  setHotelcategory(catedatas.category)
}
    return(
       <div className="flex flex-wrap gap-10 font-bold ml-36 mr-36 justify-center mt-6">
         {numbercatedata===0?(""): ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={backmore} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>
)}

     {catedata.map(catedatas => <div onClick={()=>handleCategoryClick(catedatas)}> <InCategories catedatas={catedatas} /></div>)}
     
     {numbercatedata+10 > fullcatedata.length ? ("") : ( 
    
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" onClick={loadmore} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
   <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
 </svg>
 
   )}
    
     </div>
    )
}

export default Categories