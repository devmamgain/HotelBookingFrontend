import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Categories from "./components/Categories";
import { useCategory } from "./components/CategoryContext";
import HotelDetail from "./components/HotelDetail";
import { useSearchContext } from "./components/SearchContext";
import FilTers from "./components/filters/FilTers";
import { useOutsideContext } from "./components/OutsideContext";
import { useFiltersContext } from "./components/filters/FiltersContext";
import SignUp from "./components/SingUp";
import Draggable from "react-draggable";
import CartItems from "./components/cart/CartItems";
import LogIn from "./components/LogIn";
import UserInfo from "./components/UserInfo";
import WishList from "./components/WishList";
import { useUserData } from "./components/UserDataContext";
import OrderUser from "./components/OrderUser";

function App() {
  const [hasmore, setHasmore] = useState(true);
  const [currentindex, setCurrentindex] = useState(16);
  const [testdata, setTestdata] = useState([]);
  const [data, setData] = useState([]);
  const { hotelcategory } = useCategory();
  const { searchhotel } = useSearchContext();
  const { searchnamehotel } = useSearchContext();
  const { outside, setOutside } = useOutsideContext();
  const [filteropen, setFilteropen] = useState(false);
  const{userdata,setuserdata} = useUserData()

  const tokendata = localStorage.getItem("jwtToken");

  // const [swapping, setSwapping]= usestate
console.log(searchhotel)
  const { filtersprice, filtersbedrooms, filtersbeds, filtersbathrooms, filterspropertytype, applybutton, stock } = useFiltersContext();

  const [filterCriteria, setFilterCriteria] = useState({
    stock: 0,
    filtersprice: 0,
    filtersbedrooms: 0,
    filtersbeds: 0,
    filtersbathrooms: 0,
    filterspropertytype: "",
  });

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
    const fetchData = async () => {
      try {
        let apiUrl = `http://localhost:7000/api/hotel?category=${hotelcategory}`;
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
  
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axios.get("http://localhost:7000/api/auth/user", {
                headers: {
                    Authorization: 'Bearer ' + tokendata
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

    if (tokendata) {
        fetchUserData();
    } else {
        console.error('No token found');
        setuserdata(null)

    }
    console.log(tokendata);

}, [tokendata]);
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

  const filterbutton = () => {
    // e.stopPropagation();
    setFilteropen(true);
  };

  const outsidehandle = () => {
    setOutside(false);
  };

  return (
    <div onClick={outsidehandle} className="flex flex-col">
      <NavBar />
      <Categories />
      <div className="flex justify-end">
        <button className="ml-auto mr-52" onClick={filterbutton}>
          Filter
        </button>
      </div>
      {filteropen ? <FilTers /> : ""}
     

      <Routes>
        <Route
          path="/"
          element={
            data && data.length > 0 ? (
              <InfiniteScroll
                dataLength={data.length}
                next={fetchmodedata}
                hasMore={hasmore}
                loader={data.length > 0 && <h3 className="text-center font-bold text-2xl mt-1">Loading...</h3>}
                endMessage={<p className="text-center font-bold text-3xl mt-4">You Reached the end !</p>}
              >
               
                <div className="flex justify-center flex-wrap gap-10">
                  {data.map((maindata) => (
           
                    <Home key={maindata.id} maindata={maindata} />
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="flex items-center justify-center h-96 font-bold text-3xl">
                No hotels available in this category currently!
              </div>
            )
          }
        />
        <Route path={`/:id/:name`} element={<HotelDetail />} />
        <Route path={`/signup`} element={<SignUp />} />
        <Route path={`/login`} element={<LogIn />} />
        <Route path={`/wishlist`} element={<WishList />} />
        <Route path={`/orders`} element={<OrderUser />} />

      </Routes>
    </div>
  );
}

export default App;
