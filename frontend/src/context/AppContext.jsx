import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_API_URL;

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
      const { data } = await axios.get(backendUrl + "/api/v1/user/is-auth", {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("Is Auth");
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/v1/user/current-user",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // ?problem is here
      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
        data.userData?.role === "admin" && setIsAdmin(true);
      } else {
        toast.error("error");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchSearchMovies = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/v1/movie/search", {
        params: { q: query },
      });

      if (data.success) {
        setMovies(data.movies);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sortedBySearch = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/v1/movie/sorted", {
        params: { q: query },
      });

      if (data.success) {
        setMovies(data.movies);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!query) return;
    fetchSearchMovies();
    sortedBySearch();
  }, [query]);

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
    getAuthState;
    getUserData;
  });

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  const value = {
    getAuthState,
    userData,
    getUserData,
    isLoggedIn,
    setIsLoggedIn,
    backendUrl,
    calculateRating,
    isAdmin,
    loading,
    setIsAdmin,
    setAllMovies,
    allMovies,
    token,
    navigate,
    fetchSearchMovies,
    sortedBySearch,
    query,
    movies,
    setMovies,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
