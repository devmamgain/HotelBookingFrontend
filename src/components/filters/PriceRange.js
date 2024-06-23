import React, { useEffect, useState } from 'react';
import { useFiltersContext } from './FiltersContext';

const PriceRange = () => {
  const {filtersprice} = useFiltersContext()
  const [sliderValue, setSliderValue] = useState(filtersprice);
  
  const {setConfirmprice} = useFiltersContext()
  // const {applybutton,setApplybutton} = useFiltersContext()

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value, 10));

  };
  setConfirmprice(sliderValue)

  //  if(applybutton){
  //   setFiltersprice(sliderValue)
  //  }
  

  const minRange = 0;
  const maxRange = 50000;
  const interval = 5000;

  const rangeValues = [];
  for (let i = minRange; i <= maxRange; i += interval) {
    rangeValues.push(i);
  }
let aboveprice = rangeValues.filter((data, index) => index % 2 !== 0)
let belowprice = rangeValues.filter((data, index) => index % 2 === 0)

  return (
    <div className='w-96'>
    
      <div className="relative mb-6">
        
      
        <div className="flex text-[10px] text-gray-500 dark:text-gray-400 justify-between ml-8 mr-10">
         
        
 {aboveprice.map((value, index) => (
  <span key={index}>{value}</span>
))}
       </div>
       <label htmlFor="labels-range-input" className="sr-only">
          Labels range
        </label>
        <input
          id="labels-range-input"
          type="range"
          value={sliderValue}
          min={minRange}
          max={maxRange}
          step={interval}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
       <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 ml-1">
       {belowprice.map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
