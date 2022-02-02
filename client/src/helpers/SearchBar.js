import React from "react";

export default function SearchBar () {
  return (
    <form>
      <input 
        type="text"
        id="nav-search"
        placeholder="Search Job Listings"
        name="search"
      />
      <button type="submit">Search</button>
    </form>
  );
}