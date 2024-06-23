import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSingleHotelContext } from "./SingleHotelContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const WishList =()=>{
    const [cartitems,setCartitems] = useState([])
    const [isInCart, setIsInCart] = useState(false)
    const [fullhotel, setFullhotel] = useState([])
    const {singlehotel,setSinglehotel} = useSingleHotelContext()
    const apimainurl = process.env.REACT_APP_BACKEND_URL;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const token = localStorage.getItem("jwtToken")
  const navigate = useNavigate()
  const takingcarts=async()=>{
    if(token){
    
      const response = await axios.get(apimainurl+"/wishlist/getwish",{
        headers: {
          Authorization: 'Bearer ' + token
      }}
    )
    console.log(response.data)
    const alllistdata = response.data.message ? [] : response.data
     setCartitems(alllistdata)
  //    const itemInCart = alllistdata.some(item => item.hotelId === maindata._id)
  //    setIsInCart(itemInCart)
    }
    else{
      setCartitems(cart)
      // const itemInCart = cart.some(item => item._id === maindata._id)
      // setIsInCart(itemInCart)
    }
  }
    useEffect(()=>{
     
    takingcarts()
     
    },[token])
    // console.log(cartitems)
    // console.log(isInCart)
    // console.log(cart)
    const addToCartLocal = async(id) =>{
        console.log(id)
        if (token) {
          await axios.delete(`${apimainurl}/wishlist/${id}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          })
        }
        else{
        cart = cart.filter(cartItem => cartItem._id !== id)
        localStorage.setItem('cart', JSON.stringify(cart));

        }
        setIsInCart(false)
        toast.error("Item removed from cart", { 
          autoClose: 700,
         style: {
          background: "#F28C28",
          color:"white",
         }
         });
        takingcarts()
       
    }
    const ondetails =(mainid)=>{
      
        setSinglehotel(mainid._id)
        navigate(`/${mainid._id}/${mainid.name}`)
     
      }
    return(
        <div className="flex flex-col items-center mb-5">
         {cartitems.length>0 ? cartitems.map(data=>
             <div className=" w-[60%] mt-14 border rounded-lg group drop-shadow-2xl shadow-lg flex flex-wrap" >
    <img src={data.image} alt="no image found" className="w-72 h-72 rounded-lg relative "/>
  <div className="mr-2 ml-2 flex-grow mt-3">
    <div  className="font-bold flex flex-wrap">
      <h1>
      {data.name}
      </h1>
      <div className="flex ml-auto">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-auto ">
  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
</svg>
  {data.rating}
  </div>
    </div>
    <div>
    {data.address},{data.city},{data.state}
    </div>
    <div className="font-bold ml-1">
     Rs. {data.price}
    </div>
    <div className="flex mt-3 flex-wrap">
    <div className="flex-grow">
      <h1 className="font-bold ">Rooms Details</h1>
      <h1 className="font-semibold">Bedrooms : <span className="font-normal">{data.numberOfBedrooms}</span></h1>
      <h1 className="font-semibold">Bathrooms : <span className="font-normal">{data.numberOfBathrooms}</span></h1>
      <h1 className="font-semibold">Beds : <span className="font-normal">{data.numberOfBeds}</span></h1>
      <h1 className="font-semibold">Studies : <span className="font-normal">{data.numberOfStudies}</span></h1>
      </div>
      <div className="flex-grow">
        <h1 className="font-bold ">Host Details</h1>
        <h1 className="font-semibold">Joined On :  <span className="font-normal">{data.hostJoinedOn}</span></h1>
        <h1 className="font-semibold">Hostname :  <span className="font-normal">{data.hostName}</span></h1>

        </div>
</div>
<div className="flex gap-2 mt-5 cursor-pointer ">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10  ml-auto" onClick={()=>addToCartLocal(data._id)}>
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg"  onClick={()=>ondetails(data)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

</div>
    </div>
  </div>) : 
  <div className="flex flex-grow min-h-screen items-center justify-center">
  <h1 className="font-bold text-3xl ">
    No Items added to Wishlist!
    </h1>
    </div>
    }
    <ToastContainer/>
        </div>
    )
}

export default WishList