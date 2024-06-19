import { useState } from "react";
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ()=>{
    const [currentDate, setCurrentDate]=useState(new Date())
    const [todaydate, setTodaydate] = useState(new Date())
    return(
    <ReactDatePicker 
    selected={currentDate}
    onChange={date=>setCurrentDate(date>todaydate ? date : todaydate)}
    dateFormat="dd/MM/yyyy" 
    placeholderText="Add Date" 
    closeOnScroll={true}
    className=" w-20 border border-black rounded-lg text-center"
    />
    
    )
}
export default DateSelector