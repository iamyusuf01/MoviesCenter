import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // console.log(backendUrl)
  axios.defaults.withCredentials = true;
  const token = localStorage.getItem("accessToken");

  // const [authState, setAuthState] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const navigate = useNavigate();

  const [allMovies, setAllMovies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/is-auth",
        { withCredentials: true }
      );
      if (data.success) {
        setIsLoggedIn(true);
        // getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/current-user",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success && data.user?.role === "admin") {
        setUserData(data.user);
        setIsAdmin(true);
      } else {
        toast.error(data.message);
      }
      // console.log(data?.role);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllMovies = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/movie/all-movies"
      );
      if (data.success) {
        setAllMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchSearchMovies = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/movie/search",
        { params: { q: query } }
      );

      if (data.success) {
        setMovies(data.movies);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
     if (!query) return;
    fetchSearchMovies()
  }, [query])

  const calculateRating = (movie) => {
    if (movie.rating?.length === 0) {
      return 0;
    }
    let totalRating = 0;
    movie.rating?.forEach((rating) => {
      totalRating += rating.rating;
    });
    return Math.floor(totalRating / movie.rating?.length);
  };

  useEffect(() => {
    getAuthState();
    fetchAllMovies;
    getUserData();
  });

  useEffect(() => {
    if (token) getUserData();
  }, [token]);

  const value = {
    getAuthState,
    // authState,
    userData,
    getUserData,
    isLoggedIn,
    setIsLoggedIn,
    calculateRating,
    isAdmin,
    loading,
    setIsAdmin,
    setAllMovies,
    token,
    navigate,
    allMovies,
    fetchSearchMovies, query, movies, setMovies
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
