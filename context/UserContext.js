import React, { useState, useEffect } from "react"
import { getUserAccount } from "../services/userServices"

const UserContext = React.createContext(null)

const UserProvider = ({ children })=>{

    // const location = useLocation()
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}, //data cua user,
        userData: {}
    }
    const [user, setUser] = useState(userDefault)

    const loginContext = (userData)=>{
        setUser({...userData, isLoading: false}) 
    }

    const logoutContext = ()=>{
        setUser({...userDefault, isLoading: false})
    }

    const fetchUser = async ()=>{
        let response = await getUserAccount()
        if(response && response.EC === 1){
            let groupWithRoles = response.DT.groupWithRoles
            let userData = response.DT
            let token = response.DT.access_token
            let data = {
                isAuthenticated: true,
                token: token,
                account: {groupWithRoles},
                userData: userData,
                isLoading: false
            }
            setUser(data)
        }
        else{   //ko co nguoi dung
            setUser({...userDefault, isLoading: false})
        }
    }

    useEffect(()=>{
        // if(window.location.pathname !== '/' && window.location.pathname !== '/login'){
        //     fetchUser()
        // }
        // else{
        //     setUser({...user, isLoading: false})
        // }
        fetchUser()
    }, [])

    return(
        <UserContext.Provider value={{user, loginContext, logoutContext}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}