import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/service";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    useEffect(()=>{
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    },[])


    const updateRegisterinfo = useCallback((info) => {
        setRegisterInfo(info)
    },[])

    const updateLogininfo = useCallback((info) => {
        setLoginInfo(info)
    },[])

    const registerUser = useCallback(async (e) => {
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)
        
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))
       
        setIsRegisterLoading(false)
       
        if (response.error) {
            console.log("response",response);
            return setRegisterError(response)
        }
      
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    },[registerInfo])

    const loginUser = useCallback(async(e) =>{
        e.preventDefault()
        setIsLoginLoading(true)
        setLoginError(null)
        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
        setIsLoginLoading(false)
        if(response.error){
            return setLoginError(response)
        } 
        localStorage.setItem("User",JSON.stringify(response))
        setUser(response)

    },[loginInfo])


    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User")
        setUser(null)
    },[])

    return <AuthContext.Provider value={{ user, registerInfo, updateRegisterinfo,registerUser, registerError , isRegisterLoading , logoutUser, updateLogininfo,loginUser,loginError,loginInfo,isLoginLoading}}>
        {children}
    </AuthContext.Provider>
}