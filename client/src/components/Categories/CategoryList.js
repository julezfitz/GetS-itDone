import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function CategoryList() {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [categories, setCategories] = useState([]);
  useEffect((() => {
    axios.get(`http://localhost:8001/categories`).then((result) => {
      return setCategories(result.data);
    })
  }), [])

  //loop through categories to create category list

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category *</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          {categories.map((category) => {
            return <MenuItem value={category.id}>{category.category}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}