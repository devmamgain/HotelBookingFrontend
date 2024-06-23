import React, { useState } from "react";
import PriceRange from "./PriceRange";
import BedS from "./BedS";
import BedRooms from "./BedRooms";
import BathRooms from "./BathRooms";
import PropertyType from "./PropertyType";
import { useFiltersContext } from "./FiltersContext";

const FilTers = () => {
  const {
    filtersprice,
    setFiltersprice,
    filtersbedrooms,
    setFiltersbedrooms,
    filtersbeds,
    setFiltersbeds,
    filtersbathrooms,
    setFiltersbathrooms,
    filterspropertytype,
    setFilterspropertytype,
    applybutton,
    setApplybutton,
    confirmprice,
    setConfirmprice,
    stock,
    setStock
  } = useFiltersContext();

  const [selectedBedrooms, setSelectedBedrooms] = useState(filtersbedrooms);
  const [selectedBeds, setSelectedBeds] = useState(filtersbeds);
  const [selectedBathrooms, setSelectedBathrooms] = useState(filtersbathrooms);
  const [selectedPropertyType, setSelectedPropertyType] = useState(
    filterspropertytype
  );

  const numberofbedrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const numberofbeds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const numberofbathrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const properties = ["House", "Guest House", "Flat", "Hotel"];

  const applysettings = () => {
    setStock(stock);
    setFiltersprice(confirmprice);
    setFiltersbedrooms(selectedBedrooms);
    setFiltersbeds(selectedBeds);
    setFiltersbathrooms(selectedBathrooms);
    setFilterspropertytype(selectedPropertyType);
    setApplybutton(true);
  };

  const clearall = () => {
    setStock(0);
    setSelectedBedrooms(0);
    setSelectedBeds(0);
    setSelectedBathrooms(0);
    setSelectedPropertyType("");
    setFiltersprice(0);
    setFiltersbedrooms(0);
    setFiltersbeds(0);
    setFiltersbathrooms(0);
    setFilterspropertytype("");
    setApplybutton(true);
  };

  return (
    <div className="flex flex-col flex-wrap gap-1 p-4 rounded-md shadow-md z-10">
      <h1>Filters</h1>
      <div className="flex gap-5">
        <h1 className="mt-3">Price:</h1>
        <PriceRange />
      </div>
      <div className="flex gap-3">
        <h1 className="mt-2">Bedrooms:</h1>
        <div className="flex gap-2 flex-wrap w-96 mt-2">
          {numberofbedrooms.map((bedrooms, index) => (
            <div key={index}>
              <BedRooms
                bedrooms={bedrooms}
                selected={selectedBedrooms === bedrooms}
                onSelect={() => setSelectedBedrooms(bedrooms)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <h1 className="mt-5">No. of Beds:</h1>
        <div className="flex gap-2 flex-wrap w-96 mt-2">
          {numberofbeds.map((beds, index) => (
            <div key={index}>
              <BedS
                beds={beds}
                selected={selectedBeds === beds}
                onSelect={() => setSelectedBeds(beds)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <h1 className="mt-5">Bathrooms: </h1>
        <div className="flex gap-2 flex-wrap w-96 mt-2">
          {numberofbathrooms.map((bathrooms, index) => (
            <div key={index}>
              <BathRooms
                bathrooms={bathrooms}
                selected={selectedBathrooms === bathrooms}
                onSelect={() => setSelectedBathrooms(bathrooms)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 flex-wrap mt-3">
        <h1 className="">Property Type: </h1>
        {properties.map((property, index) => (
          <div key={index}>
            <PropertyType
              property={property}
              selected={selectedPropertyType === property}
              onSelect={() => setSelectedPropertyType(property)}
            />
          </div>
        ))}
      </div>
      <div className="flex mt-7">
        <h1 className="ml-28 font-bold hover:cursor-pointer underline" onClick={clearall}>
          Clear All
        </h1>
        <button className="ml-auto mr-28 border-2 rounded-lg border-black w-20 h-11" onClick={applysettings}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilTers;
