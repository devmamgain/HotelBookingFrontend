import { createContext, useContext, useState } from "react";

const OutsideContext = createContext()

const OutsideProvider = ({children})=>{
    const [outside,setOutside] = useState(false)
    return(
        <OutsideContext.Provider value ={{outside,setOutside}}>{children}</OutsideContext.Provider>
    )
}

const useOutsideContext = ()=> useContext(OutsideContext)

export {useOutsideContext,OutsideProvider}