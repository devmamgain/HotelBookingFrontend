import { useEffect, useState } from "react"

const CartItems = ()=>{
     const [items,setItems] = useState([])
     useEffect(()=>{
      setItems(JSON.parse(localStorage.getItem('cart')))
     },[])
    return(
        <div className="w-96">
            {items ? items.map(data=>data.name) : "none"}
        </div>
    )
}

export default CartItems