import { createContext, useContext, useState } from "react";

const WhereoptionsContext = createContext()

const WhereoptionsProvider = ({children})=>{
    const [whereoptions,setWhereoptions] = useState("")
    return(
        <WhereoptionsContext.Provider value ={{whereoptions,setWhereoptions}}>{children}</WhereoptionsContext.Provider>
    )
}

const useWhereoptionsContext = ()=> useContext(WhereoptionsContext)

export {useWhereoptionsContext,WhereoptionsProvider}