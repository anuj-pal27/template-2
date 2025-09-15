import React, { useState, useEffect } from "react";
import "./Filter.css";
import { FiSearch } from "react-icons/fi";

const Filter = ({
  selectedCategory,
  selectedColors,
  selectedSize,
  selectedBrands,
  onCategorySelect,
  onColorToggle,
  onSizeSelect,
  onBrandToggle,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [priceRange] = useState({ min: 0, max: 1000 });

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

  const clearAllFilters = () => {
    onCategorySelect("All Products");
    if (selectedColors?.length) {
      selectedColors.forEach((c) => onColorToggle(c));
    }
    if (selectedSize) {
      onSizeSelect(null);
    }
    if (selectedBrands?.length) {
      selectedBrands.forEach((b) => onBrandToggle(b));
    }
    setLocalSearchTerm("");
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(localSearchTerm.toLowerCase())
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
          <p
            key={index}
            onClick={() => onCategorySelect(category)}
            style={{
              fontWeight: selectedCategory === category ? 700 : 400,
              color: selectedCategory === category ? "#2e7d32" : "",
            }}
          >
            {category}
          </p>
        ))}
      </div>

      {/* Colors */}
      <div>
        <h3 className="filterHeading">Colors</h3>
        <div className="filterColorBtn">
          {colors.map((color, index) => (
            <button
              key={index}
              className={selectedColors?.includes(color.name) ? "selected" : ""}
              style={{ backgroundColor: color.value }}
              onClick={() => onColorToggle(color.name)}
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
                selectedSize === size ? "selected" : ""
              }`}
              onClick={() => onSizeSelect(selectedSize === size ? null : size)}
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
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
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
                  checked={selectedBrands?.includes(brand.name)}
                  onChange={() => onBrandToggle(brand.name)}
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
