import { createContext, useState } from "react";

export const Usercontext=createContext({});

export function UsercontextProvider({children}){
    const [userInfo,setUserInfo]=useState({});
    return(
        <Usercontext.Provider value={{userInfo,setUserInfo}}>
        {children}
        </Usercontext.Provider>
    );
}

