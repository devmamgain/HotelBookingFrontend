import axios from "axios"
import { useEffect, useState } from "react"

const OrderUser = ()=>{
    const [orderlist,setOrderList]= useState([])
    const token = localStorage.getItem("jwtToken")

    useEffect(()=>{
    const callingdata = async()=>{
         const response = await axios.get("http://localhost:7000/api/order/getorder",{
            headers: {
              Authorization: 'Bearer ' + token
          }
         
          })
          const finalresponse = response.data
          setOrderList(finalresponse)
    }
    if(token){
    callingdata()
    }
    },[token])
    return(
        <div>
         {token ? orderlist.length>0 ? orderlist.map(data=>
             <div className=" w-72 mt-14 grid gap-2 border rounded-lg group drop-shadow-2xl shadow-lg hover:scale-125 cursor-pointer transition duration-700" >
    <h1 className="">{data._id}</h1>
    <img src={data.hotelDetails.image} alt="no image found" className="w-72 h-72 rounded-lg relative "/>
  <div className="mr-2 ml-2 grid">
    <div  className="font-bold flex">{data.hotelDetails.name}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-auto ">
  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
</svg>
  {data.hotelDetails.rating}
    </div>
    <div>
    {data.hotelDetails.address},{data.hotelDetails.city},{data.hotelDetails.state}
    </div>
    <div className="font-bold ml-1">
     Rs. {data.hotelDetails.price}
    </div>
    <div> <h1>Booked for {data.Days}</h1> </div>
    </div>
  </div>) : 
  <div className="flex flex-grow min-h-screen items-center justify-center">
  <h1 className="font-bold text-3xl ">
    No Items Ordered!
    </h1>
    </div>
    :  <div className="flex flex-grow min-h-screen items-center justify-center">
    <h1 className="font-bold text-3xl ">
      Pls Sign In in order to purchase.
      </h1>
      </div>
    }
        </div>
    )
}
export default OrderUser