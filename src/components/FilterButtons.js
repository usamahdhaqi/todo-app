import React from "react";

const FilterButtons = ({ setFilter, playSound }) => (
  <div className="filter-container">
    <button onClick={() => { setFilter("all"); playSound("/sounds/click.wav"); }}>
      Semua
    </button>
    <button onClick={() => { setFilter("active"); playSound("/sounds/click.wav"); }}>
      Aktif
    </button>
    <button onClick={() => { setFilter("completed"); playSound("/sounds/click.wav"); }}>
      Selesai
    </button>
  </div>
);

export default FilterButtons;
