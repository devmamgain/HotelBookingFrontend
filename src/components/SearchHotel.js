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
//    const openoptions = (e)=>{
//     e.stopPropagation();
//       setOutside(true)
//       console.log("heyy")
//    }
    return(
        <div className="flex w-[300px] gap-3 border-2 border-orange-500 rounded-xl text-center divide-x-2 divide-black divide-opacity-70 px-5" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

            <div className="flex flex-col">
             <h1 className=" ml-2 opacity-70">Where</h1>
            <input placeholder="State, City" className={`focus:outline-none placeholder:text-center text-center w-20 ml-2 `}  onChange={searchdestination} />
            {/* {outside ? <WhereOption/> :""} */}
            </div>
            <div className="">
            <h1 className=" opacity-70 ml-2" >Name</h1>
            <input placeholder="Name" className=" focus:outline-none placeholder:text-center text-center w-20 ml-2" onChange={searchname}/>
            </div>
           
        </div>
    )
}
export default SearchHotel