import React from "react";

export default function Searchbar () {
  return (
    <form>
      <input 
        type="text"
        id="nav-search"
        className="search-input"
        placeholder="Search Job Listings"
        name="search"
      />
      <button className="search-button" type="submit">Search</button>
    </form>
  );
}