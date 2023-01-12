import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserController = (props) => {
    const [user,setUser] = useState([
        {name : "" , img : ""}
    ])

return(
    <UserContext.Provider value={[user,setUser]}>
        {props.children}
    </UserContext.Provider>
)

}