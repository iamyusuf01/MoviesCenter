import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // console.log(backendUrl)
  axios.defaults.withCredentials = true;
  const token = localStorage.getItem("accessToken")

  // const [authState, setAuthState] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  const [allMovies, setAllMovies] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)


  const getAuthState = async () => {
    // try {
    //   const {data} = await axios.get('http://localhost:4000/api/v1/user/is-auth', { withCredentials: true } )
    //   if(data.success){
    //     setIsLoggedIn(true)
    //     getUserData()
    //   } 
    // } catch (error) {
    //     toast.error(error.message)
    // }
  }

  const getUserData = async () => {
    try {
      const {data} = await axios.get('http://localhost:4000/api/v1/user/current-user', {headers: {Authorization: `Bearer ${token}`}})
      if(data.success){
        setUserData(data.user)
        data.user?.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false)
      } else {
        toast.error(data.message)
      }
      console.log(data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchAllMovies = async () => {
    try {
      const {data} = await axios.get('http://localhost:4000/api/movie/all-movies', {withCredentials: true})
      if(data?.success){
        setAllMovies(data.movies || [])
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const calculateRating = (movie) => {
    if(movie.rating?.length === 0){
      return 0;
    }
    let totalRating = 0;
    movie.rating?.forEach((rating) => {
      totalRating += rating.rating
    });
    return Math.floor( totalRating / movie.rating?.length)
  }

  useEffect(() => {
    getAuthState()
    fetchAllMovies
    getUserData()
  })
  



  const value = {
    getAuthState,
    // authState,
    userData,
    getUserData,
    isLoggedIn, setIsLoggedIn,
    calculateRating,
    isAdmin,
    setIsAdmin,
    setAllMovies,
    token,
    navigate,
    allMovies
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
