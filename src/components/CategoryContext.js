import { createContext, useContext, useState } from "react";

const CategoryContext = createContext()

const CategoryProvider = ({children})=>{
  const [hotelcategory,setHotelcategory] = useState("National Parks")
    return (
    <CategoryContext.Provider value={{hotelcategory, setHotelcategory}}>{children}</CategoryContext.Provider>
    )
}

const useCategory = ()=> useContext(CategoryContext)

export {useCategory, CategoryProvider}