import { useState } from "react"
import { useSearchContext } from "./SearchContext"
import WhereOption from "./WhereOption"
import { useOutsideContext } from "./OutsideContext"
import { useWhereoptionsContext } from "./WhereoptionsContext"

const SearchHotel = ()=>{
    const{searchhotel,setSearchhotel} = useSearchContext()
    const{searchnamehotel,setSearchnamehotel} = useSearchContext()
    const {whereoptions,setWhereoptions} = useWhereoptionsContext()

    // const [moreoptions,setMoreoptions] = useState(false)
    const {outside,setOutside} = useOutsideContext()

   const searchdestination =(e)=>{
    setTimeout(() => {
        setSearchhotel(e.target.value)
    }, 500);
   }
   const searchname = (e)=>{
    setTimeout(() => {
        setSearchnamehotel(e.target.value)
    }, 500);
   }
   const openoptions = (e)=>{
    e.stopPropagation();
      setOutside(true)
      console.log("heyy")
   }
    return(
        <div className="flex gap-3 border-2 border-orange-500 rounded-xl text-center divide-x-2 divide-black divide-opacity-70 w-96 justify-center" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-3 mr-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

            <div className="grid w-40 justify-center justify-self-center">
             <h1 className=" opacity-70">Where</h1>
            <input placeholder="State, City" className={`w-40 placeholder:text-center text-center ml-2`}  onChange={searchdestination} onClick={openoptions}/>
            {outside ? <WhereOption/> :""}
            </div>
            <div className="grid w-20">
            <h1 className=" opacity-70" >Name</h1>
            <input placeholder="Name" className="w-20 placeholder:text-center text-center  ml-1 " onChange={searchname}/>
            </div>
           
        </div>
    )
}
export default SearchHotel