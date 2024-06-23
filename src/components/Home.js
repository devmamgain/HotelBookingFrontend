import { Link, useNavigate } from "react-router-dom"
import { useSingleHotelContext } from "./SingleHotelContext"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useSearchContext } from "./SearchContext"
import { useCategory } from "./CategoryContext"
import { useUserData } from "./UserDataContext"
import { useOutsideContext } from "./OutsideContext"
import Categories from "./Categories"
import InfiniteScroll from "react-infinite-scroll-component"
import { useFiltersContext } from "./filters/FiltersContext";
import FilTers from "./filters/FilTers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({})=>{
  const [hasmore, setHasmore] = useState(true);
  const [currentindex, setCurrentindex] = useState(16);
  const [testdata, setTestdata] = useState([]);
  const [data, setData] = useState([]);
  const { hotelcategory } = useCategory();
  const { searchhotel } = useSearchContext();
  const { searchnamehotel } = useSearchContext();
  const [filteropen, setFilteropen] = useState(false);
  const navigation = useNavigate()
  const {singlehotel,setSinglehotel} = useSingleHotelContext()
  const [cartitems,setCartitems] = useState([])
  // const [isInCart, setIsInCart] = useState(false)
   const [refreshing, setRefreshing] = useState(false)
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const token = localStorage.getItem("jwtToken")
  const { filtersprice, filtersbedrooms, filtersbeds, filtersbathrooms, filterspropertytype, applybutton, stock } = useFiltersContext();
  const [unqiueitems,setUniqueItems] = useState([])
  const filterRef = useRef(null);
  const [filterCriteria, setFilterCriteria] = useState({
    stock: 0,
    filtersprice: 0,
    filtersbedrooms: 0,
    filtersbeds: 0,
    filtersbathrooms: 0,
    filterspropertytype: "",
  });
  const{userdata,setuserdata} = useUserData()
  const apimainurl = process.env.REACT_APP_BACKEND_URL;
 
  useEffect(() => {
    if (applybutton) {
      setFilterCriteria({
        stock,
        filtersprice,
        filtersbedrooms,
        filtersbeds,
        filtersbathrooms,
        filterspropertytype,
      });
    }
    setFilteropen(false)
  }, [applybutton, filtersprice, filtersbedrooms, filtersbeds, filtersbathrooms, filterspropertytype]);
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axios.get(apimainurl+"/auth/user", {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const alluserdata = response.data;
            setuserdata(alluserdata)
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle errors here, e.g., setGettingdata(null) or display an error message.
            setuserdata(null)
        }
    };

    if (token) {
        fetchUserData();
        setRefreshing(prev=> !prev)

    } else {
        console.error('No token found');
        setuserdata(null)
        setRefreshing(prev=> !prev)
        setCartitems([])

    }
    console.log(token);

}, [token]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `${apimainurl}/hotel?category=${hotelcategory}`;
        if (searchhotel) {
          apiUrl += `&state=${searchhotel}`;
        }
        if (searchnamehotel) {
          apiUrl += `&name=${searchnamehotel}`;
        }
     
       
        if (filterCriteria.filtersprice > 0) {
          apiUrl += `&price=${filterCriteria.filtersprice}`;
        }
        if(stock > 0 ){
          apiUrl += `&outofstock=${filterCriteria.stock}`;

        }
        if (filterCriteria.filtersbedrooms > 0) {
          apiUrl += `&numberOfBedrooms=${filterCriteria.filtersbedrooms}`;
        }
        if (filterCriteria.filtersbeds > 0) {
          apiUrl += `&numberOfBeds=${filterCriteria.filtersbeds}`;
        }
        if (filterCriteria.filtersbathrooms > 0) {
          apiUrl += `&numberOfBathrooms=${filterCriteria.filtersbathrooms}`;
        }
        if (filterCriteria.filterspropertytype) {
          apiUrl += `&propertyType=${filterCriteria.filterspropertytype}`;
        }

        const resdata = await axios.get(apiUrl);
        const mainresdata = resdata.data;
        setTestdata(mainresdata);
        setData(mainresdata ? mainresdata.slice(0, 16) : []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [hotelcategory, searchhotel, searchnamehotel, filterCriteria]);
  
  
 console.log(data)
  const fetchmodedata = () => {
    if (data.length >= testdata.length) {
      setHasmore(false);
      return;
    }
    setTimeout(() => {
      if (data && data.length > 0) {
        setData(data.concat(testdata.slice(currentindex, currentindex + 16)));
        setCurrentindex((prev) => prev + 16);
      } else {
        setData([]);
      }
    }, 1000);
  };
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
     
  if (token && cart.length > 0) {
   const unique = cart.filter(data => !alllistdata.some(underdata => underdata._id === data._id)
    );
    console.log("how its unqiue", unique)
    setUniqueItems(unique)

  }
   
    //  const itemInCart = data.some(item =>alllistdata.includes( item._id))

    //  setIsInCart(itemInCart)
    }
   
  }
  useEffect(()=>{
  //   const takingcarts=async()=>{
  //   if(token){
    
  //     const response = await axios.get(apimainurl+"/wishlist/getwish",{
  //       headers: {
  //         Authorization: 'Bearer ' + token
  //     }}
  //   )
  //   console.log(response.data)
  //   const alllistdata = response.data.message ? [] : response.data
  //    setCartitems(alllistdata)
     
  // if (token && cart.length > 0) {
  //  const unique = cart.filter(data => !alllistdata.some(underdata => underdata._id === data._id)
  //   );
  //   console.log("how its unqiue", unique)
  //   setUniqueItems(unique)

  // }
   
  //   //  const itemInCart = data.some(item =>alllistdata.includes( item._id))

  //   //  setIsInCart(itemInCart)
  //   }
   
  // }
  takingcarts()
  },[token,refreshing])
  console.log(cartitems)
  console.log(cart)
  // console.log(isInCart)
  const addToCartLocal = async(quantity, e) =>{
    e.stopPropagation()
    let itemremoving
     if(token)
      {
        itemremoving = cartitems.some(item => item._id === quantity._id)
      }
      else{
        itemremoving = cart.some(item => item._id === quantity._id);
      }
      console.log("idk",itemremoving)
    if (itemremoving) {
      if (token) {
        const itemToRemove = cartitems.find(item => item._id === quantity._id);
        console.log("helo",itemToRemove)
        await axios.delete(`${apimainurl}/wishlist/${itemToRemove._id}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        toast.error("Item removed from cart", { 
          autoClose: 700,
          icon: <img src={quantity.image} alt="icon"className=" w-6 h-5"/>,
         style: {
          background: "#F28C28",
          color:"white",
         }
         });
      }
      else{
      cart = cart.filter(cartItem => cartItem._id !== quantity._id)
      localStorage.setItem('cart', JSON.stringify(cart));
      toast.error("Removed from cart", { 
        autoClose: 700,
        icon: <img src={quantity.image} alt="icon"className=" w-6 h-5"/>,
       style: {
        background: "#F28C28",
        color:"white",
       }
       });
      }
    } else {
      if(token){
      await axios.post(apimainurl+"/wishlist/postwish",{hotelId:quantity._id},{
        headers: {
          Authorization: 'Bearer ' + token
      }
    })
    toast.success("Item added to cart", { 
      autoClose: 700,
      icon: <img src={quantity.image} alt="icon"className=" w-6 h-5"/>,
     style: {
      background: "#F28C28",
      color:"white",
     }
     });
  }
    else{
      cart.push(quantity );
      localStorage.setItem('cart', JSON.stringify(cart));
      toast.success("Item added to cart", { 
        autoClose: 700,
        icon: <img src={quantity.image} alt="icon"className=" w-6 h-5"/>,
       style: {
        background: "#F28C28",
        color:"white",
       }
       });

    }
    }
  
    console.log("dasdwa",cart.map(data=>data._id))

    setRefreshing(prev=>!prev)
  }

  // if (token && cart.length > 0) {
  //   const postWishlist = async () => {
  //     for (const cartItem of cart) {
  //       // Check if the cart item is not already in cartitems
  //       const itemExists = alllistdata.some(cartItemInList => cartItemInList._id === cartItem._id);
        
  //       if (!itemExists) {
  //         // If the item does not exist, post it to the wishlist
  //         try {
  //           await axios.post(
  //             apimainurl+"/wishlist/postwish",
  //             { hotelId: cartItem._id },
  //             {
  //               headers: {
  //                 Authorization: 'Bearer ' + token
  //               }
  //             }
  //           );
  //         } catch (error) {
  //           console.error('Error posting to wishlist:', error);
  //         }
  //       }
  //     }
  
  //     // Remove the cart from local storage after processing all items
  //     localStorage.removeItem("cart");
  //   };
  
  //   // Execute the postWishlist function
  //   postWishlist();
  // }
  // if(token  && cart.length > 0){
  //   cart.map(async(dataid) => 
  //     cartitems.some(data => data._id === dataid._id) ? null : await axios.post(apimainurl+"/wishlist/postwish",{hotelId:dataid._id},{
  //       headers: {
  //         Authorization: 'Bearer ' + token
  //     }
      
  //     }) )
   
  //   localStorage.removeItem("cart");

  // }

  // if (token && cart.length > 0) {
  //   let unique = cart.filter(data => 
  //     !cartitems.some(underdata => underdata._id === data._id)
  //   );
  //   unique.map(async(uniquedata)=> 
  //     await axios.post(apimainurl+"/wishlist/postwish",{hotelId:uniquedata._id},{
  //            headers: {
  //            Authorization: 'Bearer ' + token
  //          }
          
  //         }) )
  //   localStorage.removeItem("cart");
  // }
  if(unqiueitems.length > 0 && cart.length>0) 
    {
      console.log("thisone is 1", unqiueitems)
      unqiueitems.map(async(uniquedata)=> 
        await axios.post(apimainurl+"/wishlist/postwish",{hotelId:uniquedata._id},{
               headers: {
               Authorization: 'Bearer ' + token
             }
            
            }) )
            localStorage.removeItem("cart");
   takingcarts()            

    }
  const ondetails =(maindata)=>{
    setSinglehotel(maindata._id)
    navigation(`/${maindata._id}/${maindata.name}`)
  }
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilteropen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

    return(
      <div className="flex flex-col">
 {filteropen ? 
            <div ref={filterRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-10">
<FilTers /> </div>
: ""}
 {
      data && data.length > 0 ?

      (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchmodedata}
          hasMore={hasmore}
          loader={data.length > 0 && <h3 className="text-center font-bold text-2xl mt-1">Loading...</h3>}
          endMessage={<p className="text-center font-bold text-3xl mt-4">You Reached the end !</p>}
          style={{ overflow: 'hidden' }}

        >
            <div className="flex flex-wrap flex-grow gap-5 justify-center">
           <Categories />

           <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setFilteropen(true)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7 mt-5 ml-5 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
</svg>

      
            </div>
           <div className="flex justify-center flex-wrap gap-10">
                  {data.map((maindata) => (<div className=" w-72 mt-14 grid gap-2 border rounded-lg group drop-shadow-2xl shadow-lg hover:scale-125 cursor-pointer transition duration-700" onClick={()=>ondetails(maindata)}>
    <img src={maindata.image} alt="no image found" className="w-72 h-72 rounded-lg relative "/>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={cart.some(items=> items._id === maindata._id) || cartitems.some(items=> items._id === maindata._id) ? "red" : "grey"} className="w-6 h-6 absolute  left-60 mt-4 hover:cursor-pointer " onClick={(e)=>addToCartLocal(maindata, e)}>
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>
{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 absolute left-60 mt-16 invisible hover:cursor-pointer group-hover:visible">
   <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
 </svg> */}
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
                    ))}
                    </div>
                  </InfiniteScroll>) : (
              <>
               <div className="flex flex-grow gap-5 justify-center">
           <Categories />
           <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setFilteropen(true)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7 mt-5 ml-5 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
</svg>
            </div>

              <div className="flex items-center justify-center h-96 font-bold text-3xl">
                No hotels available in this category currently!
              </div>
              </>
            )
          }
                <ToastContainer />

              </div>

    )

}
export default Home