import React, { useState } from "react";

const BedS = ({ beds, selected, onSelect }) => {
  return (
    <div
      className={`border-2 border-black px-2 text-center hover:cursor-pointer ${
        selected ? "bg-gray-300" : ""
      } hover:bg-gray-300 rounded-lg`}
      onClick={onSelect}
    >
      {beds}
    </div>
  );
};

export default BedS;
