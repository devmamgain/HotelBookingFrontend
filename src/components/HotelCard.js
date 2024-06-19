import { useEffect, useState } from "react";
import DateSelector from "./DateSelector";
import ReactDatePicker from "react-datepicker";
import { useUserData } from "./UserDataContext";
import axios from "axios";

const HotelCard = ({ singlehoteldata }) => {
    const [images,setImages] = useState("")
    const [checkin,setCheckin] = useState(new Date())
    const [checkout,setcheckout] = useState(new Date())
    const [totalprice,setTotalprice] = useState(0)
    const{userdata,setuserdata} = useUserData()
  const [nodays,setNodays] = useState(0)
    const [todaydate, setTodaydate] = useState(new Date())
    
  
     const selectingimage =(image)=>{
      setImages(image)
     }
     const token = localStorage.getItem("jwtToken")
     useEffect(() => {
      const calculateTotalPrice = () => {
        const dayDifference = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
        const numNights = dayDifference > 0 ? dayDifference : 0;
        const price = (numNights * 150) + singlehoteldata.price;
        setNodays(numNights)
        setTotalprice(price);
      };
  
      calculateTotalPrice();
    }, [checkin, checkout, singlehoteldata.price]);
    //  useEffect(()=>{
    
    //  settotalprice(((checkout.getDay() - checkin.getDay()) * 150 )+ singlehoteldata.price )
      
    //   console.log("pricing",totalprice)
    //  },[checkin,checkout])
     console.log("date",checkin)
     console.log("userdata",singlehoteldata._id)
     const handlePayment = () => {
      if(token)
        {
      const options = {
        "key": "rzp_test_GwJz8I08SMFu9W", // Enter the Key ID generated from the Dashboard
        "amount": totalprice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Dev's Bank", //your business name
        "description": "Thehotelbooking",
        "image": "https://example.com/your_logo",
        // "order_id": "465464543523", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": userdata.username, //your customer's name
          "email": userdata.email,
          "contact": userdata.number //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        },
        handler: responseHandler

      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
    else{
     console.log("Sign in first")
    }
    };
    const responseHandler = async (response) => {
      if(response && singlehoteldata._id && nodays)
        {
          await axios.post("http://localhost:7000/api/order/postorder",{
            hotelId:singlehoteldata._id,
            paymentId:response.razorpay_payment_id,
            Days:nodays
          },{
            headers: {
              Authorization: 'Bearer ' + token
          }
         
          })
        }
      console.log("responserazorpay",response)
    }
    return (
      <div className="flex mt-10 ml-12 justify-center gap-5 mb-10">
        <div className="grid gap-3 w-[30%]">
        <img src={(images ==="" ? singlehoteldata.image : images)} alt={singlehoteldata.name || "No image found"} className="rounded-lg relative justify-self-center size-96 mt-6" />
        {singlehoteldata.imageArr && (<div className="flex flex-wrap gap-5 justify-center">
        <img src={singlehoteldata.image} alt={"No pics found"} className=" mb-5 w-28 h-28 rounded-lg relative hover:cursor-pointer hover:border-4 border-indigo-500/100 " onClick={()=>selectingimage(singlehoteldata.image)}/>
         {singlehoteldata.imageArr.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className=" mb-5 w-28 h-28 rounded-lg relative hover:cursor-pointer hover:border-4 border-indigo-500/100 "
            onClick={()=>selectingimage(image)}
            onError={(e) => e.target.style.display = 'none'} 
          />
        ))}</div>)}
       <div className="font-bold justify-self-center">
            {singlehoteldata.name}

           
          </div>
          <div className=" justify-self-center">
            {`${singlehoteldata.address}, ${singlehoteldata.city}, ${singlehoteldata.state}`}
          </div>
       </div>

        <div className=" w-[30%] mt-5">
          <div className="grid gap-1">
            <div className="text-xl ">
            Hosted By <span className=" font-bold">{singlehoteldata.hostName}</span>, Joined On <span className=" font-bold">{singlehoteldata.hostJoinedOn}</span>
            </div>
          <div>{singlehoteldata.numberOfguest} guests, {singlehoteldata.numberOfBedrooms} bedrooms, {singlehoteldata.numberOfBeds} beds, {singlehoteldata.numberOfBathrooms} bathrooms </div>
          <div className="border-b-2 border-black mt-5 mb-5"/>
          </div>
          <div className="grid">
          <h1 className="text-xl ">Ameneties</h1>
          <div className="flex gap-2">
            {singlehoteldata.ameneties?.map((data,index)=><div className="gap-2"> {data}{singlehoteldata.ameneties.length - 1 === index ? "." : ","}</div>)}
            </div>
          </div>
          <div className="grid mt-3">
          <h1 className="text-xl ">Health and Safety</h1>
            {singlehoteldata.healthAndSafety?.map((data)=><div className="gap-2"> {data}</div>)}
            <div className="border-b-2 border-black mt-5 mb-5"/>

          </div>
          <div className="grid mt-3">
          <h1 className="text-xl ">Property Type</h1>
 {singlehoteldata.propertyType}
          </div>
          <div className="grid mt-3">
          <h1 className="text-xl ">House Rules</h1>
          {singlehoteldata.houseRules?.map((data)=><div className="gap-2"> {data}</div>)}
          </div>
          
        </div>
        <div className="grid border rounded-lg group drop-shadow-2xl shadow-lg mt-3 w-[30%] ">
        <div className="ml-4 font-bold mt-4 flex">
          Rs. {singlehoteldata.price}
          <div className="ml-auto flex mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
</svg>
            {singlehoteldata.rating}
          </div>
          </div>
          <div className="ml-4 flex gap-20 mt-4">
            <div>
            <h1>Check In
            </h1>
            <ReactDatePicker     
            onChange={date=>setCheckin(date>todaydate ? date : todaydate)}
            selected={checkin}

  dateFormat="dd/MM/yyyy" 
    placeholderText="Add Date" 
    closeOnScroll={true}
    className=" w-20 border border-black rounded-lg text-center"/>
            </div>
            <div>
            <h1>Check Out
            </h1>
            <ReactDatePicker     
            onChange={date=>setcheckout(date>todaydate ? date : todaydate)}
            selected={checkout>checkin ? checkout : checkin}

  dateFormat="dd/MM/yyyy" 
    placeholderText="Add Date" 
    closeOnScroll={true}
    className=" w-20 border border-black rounded-lg text-center"/>
            </div>
          </div>
            <div>
          </div>
          <button className="border-2 bg-orange-500 w-80 h-11 text-white rounded-lg justify-self-center" id="rzp-button1" onClick={handlePayment}>
                Reserve
              </button>
              <div className="ml-3">
                Rs. {singlehoteldata.price}
              </div>
              <div className="flex ml-3">
                Service fee
                <h1 className="ml-auto mr-4">Rs. 150</h1>
              </div>
              <div className="border-b-2 border-black ml-5 mr-5"></div>
              <div className="ml-5">
                Total : Rs. {totalprice}
              </div>
          </div>
      </div>
    );
  }
  
  export default HotelCard;
  