import axios from "axios"
import { useEffect, useState } from "react"
import HotelCard from "./HotelCard"
import { useParams } from "react-router-dom"

const HotelDetail = ()=>{
    const apimainurl = process.env.REACT_APP_BACKEND_URL;

    const {id} = useParams()
   const [singlehotelvalue,setSinglehotelvalue] = useState([])
    useEffect(()=>{
     const perhotel = async()=>{
        const perhoteldata = await axios.get(`${apimainurl}/hotel/${id}`)
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