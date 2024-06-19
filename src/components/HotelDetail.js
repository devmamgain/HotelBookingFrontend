import axios from "axios"
import { useEffect, useState } from "react"
import HotelCard from "./HotelCard"
import { useParams } from "react-router-dom"

const HotelDetail = ()=>{
    const {id} = useParams()
   const [singlehotelvalue,setSinglehotelvalue] = useState([])
    useEffect(()=>{
     const perhotel = async()=>{
        const perhoteldata = await axios.get(`http://localhost:7000/api/hotel/${id}`)
        const perhoteldatas = perhoteldata.data
        setSinglehotelvalue(perhoteldatas)
     }
     perhotel()
    },[])
    return(
        <div>
         {<HotelCard singlehoteldata = {singlehotelvalue}/>}
        </div>
    )
}

export default HotelDetail