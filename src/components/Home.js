import { Link, useNavigate } from "react-router-dom"
import { useSingleHotelContext } from "./SingleHotelContext"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

const Home = ({maindata})=>{
  const navigation = useNavigate()
  const {singlehotel,setSinglehotel} = useSingleHotelContext()
  const [cartitems,setCartitems] = useState([])
  const [isInCart, setIsInCart] = useState(false)

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const token = localStorage.getItem("jwtToken")

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
     const itemInCart = alllistdata.some(item => item._id === maindata._id)
     setIsInCart(itemInCart)
    }
    else{
      setCartitems(cart)
      const itemInCart = cart.some(item => item._id === maindata._id)
      setIsInCart(itemInCart)
    }
  }
  takingcarts()
   
  },[token])
  console.log(cartitems)
  console.log(isInCart)
  const addToCartLocal = async(quantity) =>{
    if (isInCart) {
      if (token) {
        const itemToRemove = cartitems.find(item => item._id === maindata._id);
        console.log("helo",itemToRemove)
        await axios.delete(`http://localhost:7000/api/wishlist/${itemToRemove._id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
      }
      else{
      cart = cart.filter(cartItem => cartItem._id !== quantity._id)
      }
      setIsInCart(false)
    } else {
      cart.push(quantity );
      setIsInCart(true)
    }
    console.log("dasdwa",cart.map(data=>data._id))
    if(token){
      cart.map(async(dataid) => 
        cartitems._id != dataid._id ?
        await axios.post("http://localhost:7000/api/wishlist/postwish",{hotelId:dataid._id},{
        headers: {
          Authorization: 'Bearer ' + token
      }
     
      }) : null
    )
     
      localStorage.removeItem("cart");

    }
    else{
    localStorage.setItem('cart', JSON.stringify(cart));
    }
    setIsInCart(true)

  }
  if(token  && cart.length > 0){
    cart.map(async(dataid) => 
      await axios.post("http://localhost:7000/api/wishlist/postwish",{hotelId:dataid._id},{
      headers: {
        Authorization: 'Bearer ' + token
    }
   
    }))
   
    localStorage.removeItem("cart");

  }
  const ondetails =()=>{
    setSinglehotel(maindata._id)
    navigation(`/${maindata._id}/${maindata.name}`)
  }
    return(
     
<div className=" w-72 mt-14 grid gap-2 border rounded-lg group drop-shadow-2xl shadow-lg hover:scale-125 cursor-pointer transition duration-700" onClick={ondetails}>
    <img src={maindata.image} alt="no image found" className="w-72 h-72 rounded-lg relative "/>


  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isInCart ? "red" : "grey"} className="w-6 h-6 absolute  left-60 mt-4 hover:cursor-pointer " onClick={()=>addToCartLocal(maindata)}>
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 absolute left-60 mt-16 invisible hover:cursor-pointer group-hover:visible">
   <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
 </svg>
  <div className="mr-2 ml-2 grid">
    <div  className="font-bold flex">{maindata.name}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-auto ">
  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
</svg>
  {maindata.rating}
    </div>
    <div>
    {maindata.address},{maindata.city},{maindata.state}
    </div>
    <div className="font-bold ml-1">
     Rs. {maindata.price}
    </div>
    </div>
  </div>
  
    )
}
export default Home