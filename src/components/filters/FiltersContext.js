import { createContext, useContext, useState } from "react";

const FiltersContext = createContext()

const FiltersProvider = ({children})=>{
    const [filtersprice,setFiltersprice] = useState(0)
    const [filtersbedrooms,setFiltersbedrooms] = useState(0)
    const [filtersbeds,setFiltersbeds] = useState(0)
    const [filtersbathrooms,setFiltersbathrooms] = useState(0)
    const [filterspropertytype,setFilterspropertytype] = useState("")
    const [stock,setStock] = useState(0)

  const [confirmprice,setConfirmprice] = useState(0)

    const [applybutton,setApplybutton] = useState(false)
    return(
        <FiltersContext.Provider value ={{filtersprice,setFiltersprice,filtersbedrooms,setFiltersbedrooms,filtersbeds,setFiltersbeds,filtersbathrooms,setFiltersbathrooms,filterspropertytype,setFilterspropertytype,applybutton,setApplybutton,confirmprice,setConfirmprice,stock,setStock}}>{children}</FiltersContext.Provider>
    )
}

const useFiltersContext = ()=> useContext(FiltersContext)

export {useFiltersContext,FiltersProvider}