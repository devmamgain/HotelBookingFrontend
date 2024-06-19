import { createContext, useContext, useState } from "react";

const SearchContext = createContext()

const SearchProvider = ({children})=>{
    const [searchhotel,setSearchhotel] = useState("")
    const [searchnamehotel,setSearchnamehotel] = useState("")
    return(
        <SearchContext.Provider value ={{searchhotel,setSearchhotel,searchnamehotel,setSearchnamehotel}}>{children}</SearchContext.Provider>
    )
}

const useSearchContext = ()=> useContext(SearchContext)

export {useSearchContext,SearchProvider}