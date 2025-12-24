import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // console.log(backendUrl)
  axios.defaults.withCredentials = true;

  // const [authState, setAuthState] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(false)

  const getAuthState = async () => {
    try {
      const {data} = await axios.get('http://localhost:4000/api/v1/user/is-auth', { withCredentials: true } )
      if(data.success){
        setIsLoggedIn(true)
        getUserData()
      } 
    } catch (error) {
        toast.error(error.message)
    }
  }

  const getUserData = async () => {
    try {
      const {data} = axios.get('http://localhost:4000/api/v1/user/current-user',)
      if(data.success){
        toast.success(data.success)
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }
      console.log(data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAuthState()
  })


  const value = {
    getAuthState,
    // authState,
    userData,
    getUserData,
    isLoggedIn, setIsLoggedIn
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
