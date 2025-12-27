import { Box, IconButton, InputBase, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [input, setInput] = useState(queryParam);
  const navigate = useNavigate();

  // 🔎 Update URL on search
  const handleSearch = () => {
    if (!input.trim()) {
      setSearchParams({});
      setMovies([]);
      return;
    }

    navigate("/search");
    setSearchParams({ q: input.trim() });
  };

  useEffect(() => {
    if (!queryParam) return;

    const searchMovies = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/movie/search",
          { params: { q: queryParam } }
        );

        if (data.success) {
          setMovies(data.movies);
        }
        console.log(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    searchMovies();
  }, [queryParam]);

  useEffect(() => {
    setInput(queryParam);
  }, [queryParam]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "4px",
        flexGrow: 1,
        height: "36px",
        overflow: "hidden",
      }}
    >
      {/* Category */}
      <Select
        defaultValue="all"
        sx={{
          height: "100%",
          borderRight: "1px solid #ddd",
          ".MuiSelect-select": { padding: "6px 12px" },
        }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="movies">Movies</MenuItem>
        <MenuItem value="tv">TV Shows</MenuItem>
      </Select>

      {/* Search input */}
      <InputBase
        placeholder="Search IMDb"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        sx={{ paddingX: 2, flexGrow: 1 }}
      />

      {/* Search button */}
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
    
  );
};

export default Search;
