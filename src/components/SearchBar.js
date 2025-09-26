import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="search-container">
    <input
      type="text"
      placeholder="Cari todo..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  </div>
);

export default SearchBar;
