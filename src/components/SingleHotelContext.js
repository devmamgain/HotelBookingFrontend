import { createContext, useContext, useState } from "react";

const SingleHotelContext = createContext()

const SingleHotelProvider = ({children})=>{
    const [singlehotel,setSinglehotel] = useState()
    return(
        <SingleHotelContext.Provider value ={{singlehotel,setSinglehotel}}>{children}</SingleHotelContext.Provider>
    )
}

const useSingleHotelContext = ()=> useContext(SingleHotelContext)

export {useSingleHotelContext,SingleHotelProvider}