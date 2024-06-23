import axios from "axios";
import { useEffect, useState } from "react";
import InCategories from "./InCategories";
import { useCategory } from "./CategoryContext";

const Categories = () => {
    const [catedata, setCatedata] = useState([]);
    const { hotelcategory, setHotelcategory } = useCategory();
    const apimainurl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(apimainurl+"/category");
            setCatedata(data.data);
        };
        fetchData();
    }, []);

    const handleCategoryClick = (catedatas) => {
        setHotelcategory(catedatas.category);
    };

    return (
        <div className="mt-6 overflow-x-auto w-[70%]  custom-scrollbar">
            <div className="flex gap-8 px-3 ">
                {catedata.map((catedatas) => (
                    <div key={catedatas.id} onClick={() => handleCategoryClick(catedatas)} className="whitespace-nowrap font-bold pb-2 ">
                        <InCategories catedatas={catedatas} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
