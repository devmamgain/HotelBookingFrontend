import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSingleHotelContext } from "./SingleHotelContext";

const WishList =()=>{
    const [cartitems,setCartitems] = useState([])
    const [isInCart, setIsInCart] = useState(false)
    const [fullhotel, setFullhotel] = useState([])
    const {singlehotel,setSinglehotel} = useSingleHotelContext()

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const token = localStorage.getItem("jwtToken")
  const navigate = useNavigate()
    useEffect(()=>{
      const takingcarts=async()=>{
      if(token){
      
        const response = await axios.get("http://localhost:7000/api/wishlist/getwish",{
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
    takingcarts()
     
    },[token])
    // console.log(cartitems)
    // console.log(isInCart)
    // console.log(cart)
    const addToCartLocal = async(id) =>{
        console.log(id)
        if (token) {
          await axios.delete(`http://localhost:7000/api/wishlist/${id}`, {
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
       
    }
    const ondetails =(mainid)=>{
      
        setSinglehotel(mainid._id)
        navigate(`/${mainid._id}/${mainid.name}`)
     
      }
    return(
        <div>
         {cartitems.length>0 ? cartitems.map(data=>
             <div className=" w-72 mt-14 grid gap-2 border rounded-lg group drop-shadow-2xl shadow-lg hover:scale-125 cursor-pointer transition duration-700" >
    <img src={data.image} alt="no image found" className="w-72 h-72 rounded-lg relative "/>
  <div className="mr-2 ml-2 grid">
    <div  className="font-bold flex">{data.name}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-auto ">
  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
</svg>
  {data.rating}
    </div>
    <div>
    {data.address},{data.city},{data.state}
    </div>
    <div className="font-bold ml-1">
     Rs. {data.price}
    </div>
    <button onClick={()=>addToCartLocal(data._id)}>Remove</button>
    <button onClick={()=>ondetails(data)}>Purchase</button>

    </div>
  </div>) : 
  <div className="flex flex-grow min-h-screen items-center justify-center">
  <h1 className="font-bold text-3xl ">
    No Items added to Wishlist!
    </h1>
    </div>
    }
        </div>
    )
}

export default WishList