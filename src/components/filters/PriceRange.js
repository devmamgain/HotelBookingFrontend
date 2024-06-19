import React, { useEffect, useState } from 'react';
import { useFiltersContext } from './FiltersContext';

const PriceRange = () => {
  const [sliderValue, setSliderValue] = useState(1000);
  const {setConfirmprice} = useFiltersContext()
  // const {applybutton,setApplybutton} = useFiltersContext()

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value, 10));

  };
  setConfirmprice(sliderValue)

  //  if(applybutton){
  //   setFiltersprice(sliderValue)
  //  }
  

  const minRange = 1000;
  const maxRange = 50000;
  const interval = 3500;

  const rangeValues = [];
  for (let i = minRange; i <= maxRange; i += interval) {
    rangeValues.push(i);
  }

  return (
    <div>
      Price:
      <div className="relative mb-6">
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
        <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
         
          {rangeValues.map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
