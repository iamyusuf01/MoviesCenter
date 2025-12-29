import { Box, IconButton, InputBase, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieList from "../../pages/students/MoviesList";
import { AppContext } from "../../context/AppContext";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchSearchMovies, sortedBySearch,  movies } = useContext(AppContext);
  const queryParam = searchParams.get("q") || "";
  const [input, setInput] = useState(queryParam);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!input.trim()) {
      return;
    }
    const searchFilterd = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(input) ||
        movie.description.toLowerCase().includes(input)
        
    );

    fetchSearchMovies(searchFilterd);
    // sortedBySearch(searchFilterd)
    navigate(`/search?q=${input.trim()}`);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <>
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
          <MenuItem value="all" onClick={() => navigate("/all")}>
            All
          </MenuItem>
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
    </>
  );
};

export default Search;
