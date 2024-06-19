import { useEffect, useState } from "react";
import PriceRange from "./PriceRange";
import BedRooms from "./BedRooms";
import BedS from "./BedS";
import BathRooms from "./BathRooms";
import PropertyType from "./PropertyType";
import { useFiltersContext } from "./FiltersContext";

const FilTers = () => {
  const [countbedrooms, setCountbedrooms] = useState(0);
  const [countbeds, setCountbeds] = useState(0);
  const [countbathrooms, setCountbathrooms] = useState(0);
  const [propertytype, setPropertytype] = useState("");
  const [stocking,setStocking] = useState(0)
  const { applybutton, setApplybutton } = useFiltersContext();
  const { setFiltersbedrooms, setFiltersbeds, setFiltersbathrooms, setFilterspropertytype, setFiltersprice , confirmprice, setStock} = useFiltersContext();

  const numberofbedrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const numberofbeds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const numberofbathrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const properties = ["House", "Guest House", "Flat", "Hotel"];

  const applysettings = () => {
    setStock(stocking)
    setFiltersprice(confirmprice)
    setFiltersbedrooms(countbedrooms);
    setFiltersbeds(countbeds);
    setFiltersbathrooms(countbathrooms);
    setFilterspropertytype(propertytype);
    setApplybutton(true);
  };
  const clearall = () => {
    setStock(0)
    setCountbedrooms(0);
    setCountbeds(0);
    setCountbathrooms(0);
    setPropertytype("");
    setFiltersprice(0);
    setFiltersbedrooms(0);
    setFiltersbeds(0);
    setFiltersbathrooms(0);
    setFilterspropertytype("");
    setApplybutton(true);
  };
  useEffect(() => {
    if (applybutton) {
      setApplybutton(false);
    }
  }, [applybutton, setApplybutton]);

  return (
    <div className="grid gap-3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md z-10">
      Filters
      <h1 onClick={()=>setStocking(1)} className=" cursor-pointer">Outstock</h1>

      <PriceRange />
      <div className="flex gap-3">
        Bedrooms:
        <div className="flex gap-2 flex-wrap w-96 mt-2">
          {numberofbedrooms.map((bedrooms, index) => (
            <div key={index} onClick={() => setCountbedrooms(bedrooms)}>
              <BedRooms bedrooms={bedrooms} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        Beds:
        <div className="flex gap-2 flex-wrap w-96 mt-2">
          {numberofbeds.map((beds, index) => (
            <div key={index} onClick={() => setCountbeds(beds)}>
              <BedS beds={beds} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        Bathrooms:
        <div className="flex gap-2 flex-wrap w-96 mt-2">
          {numberofbathrooms.map((bathrooms, index) => (
            <div key={index} onClick={() => setCountbathrooms(bathrooms)}>
              <BathRooms bathrooms={bathrooms} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        Property Type:
        {properties.map((property, index) => (
          <div key={index} onClick={() => setPropertytype(property)}>
            <PropertyType property={property} />
          </div>
        ))}
      </div>
      <div className="flex mt-7">
        <h1 className="ml-28 font-bold hover:cursor-pointer underline" onClick={clearall}>Clear All</h1>
        <button className="ml-auto mr-28 border-2 rounded-lg border-black w-20 h-11" onClick={applysettings}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilTers;
