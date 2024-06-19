import { useCategory } from "./CategoryContext"

const InCategories =({catedatas})=>{
  const {hotelcategory} = useCategory()
    return(
      <div className={`hover:cursor-pointer hover:underline active:text-blue-500 focus:underline ${hotelcategory === catedatas.category ? "underline":""}`}>
        {catedatas.category}
      </div>
    )
}
export default InCategories