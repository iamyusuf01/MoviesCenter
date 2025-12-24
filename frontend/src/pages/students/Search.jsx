import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";

const Search = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <div>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={value}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="releaseYear">RealeasYear</MenuItem>
              <MenuItem value="duration">Duration</MenuItem>
            </Select>
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Search;
