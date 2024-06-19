import { createContext, useContext, useState } from "react";

const UserData = createContext()

const UserDataProvider = ({children})=>{
    const [userdata,setuserdata] = useState(null)
    return(
        <UserData.Provider value ={{userdata,setuserdata}}>{children}</UserData.Provider>
    )
}

const useUserData = ()=> useContext(UserData)

export {useUserData,UserDataProvider}