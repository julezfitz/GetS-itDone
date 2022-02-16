import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function CategoryList(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/categories`).then((result) => {
      return setCategories(result.data);
    });
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    props.onSelect(e.target.value);
    setSelectedCategory(e.target.value);
  };

  //loop through categories to create category list
  return (
    <FormControl fullWidth>
      {props.edit ? <InputLabel id="demo-simple-select-label">{props.label}</InputLabel> : <InputLabel id="demo-simple-select-label">Category *</InputLabel>}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Category"
        value={selectedCategory}
        onChange={handleChange}
      >
        {categories.map((category) => {
          return (
            <MenuItem
              key={Math.random().toString(36).substr(2, 9)}
              value={category.id}
            >
              {category.category}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
