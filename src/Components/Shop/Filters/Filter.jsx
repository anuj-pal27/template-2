import React, { useState } from "react";
import "./Filter.css";
import { FiSearch } from "react-icons/fi";

const Filter = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#00FF00" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Purple", value: "#800080" },
    { name: "Pink", value: "#FFC0CB" },
    { name: "Orange", value: "#FFA500" },
    { name: "Gray", value: "#808080" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const brands = [
    { name: "Nike", count: 25 },
    { name: "Adidas", count: 18 },
    { name: "Puma", count: 12 },
    { name: "Reebok", count: 8 },
    { name: "Under Armour", count: 15 },
    { name: "New Balance", count: 10 },
    { name: "Converse", count: 6 },
    { name: "Vans", count: 9 },
    { name: "Jordan", count: 7 },
    { name: "Champion", count: 5 },
  ];

  const categories = [
    "All Products",
    "Dresses",
    "Tops & Tees",
    "Pants & Shorts",
    "Shoes",
    "Accessories",
    "Bags",
    "Jewelry",
    "Watches",
  ];

  const handleColorClick = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const handleSizeClick = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSearchTerm("");
    setPriceRange({ min: 0, max: 1000 });
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filterSection">
      <div className="clearFiltersContainer">
        <button className="clearFiltersBtn" onClick={clearAllFilters}>
          Clear All Filters
        </button>
      </div>

      {/* Categories */}
      <div className="filterCategories">
        <h3 className="filterHeading">Categories</h3>
        {categories.map((category, index) => (
          <p key={index}>{category}</p>
        ))}
      </div>

      {/* Colors */}
      <div>
        <h3 className="filterHeading">Colors</h3>
        <div className="filterColorBtn">
          {colors.map((color, index) => (
            <button
              key={index}
              className={selectedColors.includes(color) ? "selected" : ""}
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorClick(color)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="filterHeading">Sizes</h3>
        <div className="sizeButtons">
          {sizes.map((size, index) => (
            <button
              key={index}
              className={`sizeButton ${
                selectedSizes.includes(size) ? "selected" : ""
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="filterHeading">Brands</h3>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="searchIcon" />
        </div>
        <div className="brandList">
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand, index) => (
              <div key={index} className="brandItem">
                <input
                  type="checkbox"
                  id={`brand-${index}`}
                  className="brandRadio"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                />
                <label htmlFor={`brand-${index}`} className="brandLabel">
                  {brand.name}
                </label>
                <span className="brandCount">{brand.count}</span>
              </div>
            ))
          ) : (
            <div className="notFoundMessage">No brands found</div>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="filterHeading">Price Range</h3>
        <div className="priceRange">
          <p>
            <span>${priceRange.min}</span> - <span>${priceRange.max}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Filter;
