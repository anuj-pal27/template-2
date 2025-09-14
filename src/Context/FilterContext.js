import React, { createContext, useContext, useState, useEffect } from 'react';
import StoreData from '../Data/StoreData';

const FilterContext = createContext();

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    priceRange: [20, 69],
    selectedColors: [],
    selectedSizes: [],
    selectedCategories: [],
    selectedBrands: [],
    searchTerm: ''
  });

  const [filteredProducts, setFilteredProducts] = useState(StoreData);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [20, 69],
      selectedColors: [],
      selectedSizes: [],
      selectedCategories: [],
      selectedBrands: [],
      searchTerm: ''
    });
  };

  // Helper function to get product category
  const getProductCategory = (product) => {
    const name = product.productName.toLowerCase();
    if (name.includes('jacket') || name.includes('coat')) return 'Jackets';
    if (name.includes('shirt') || name.includes('top')) return 'T-Shirts & Tops';
    if (name.includes('dress')) return 'Dresses';
    if (name.includes('short')) return 'Shorts';
    if (name.includes('sweat') || name.includes('jumper')) return 'Sweatshirts';
    if (name.includes('swim')) return 'Swimwear';
    if (name.includes('jean')) return 'Jeans';
    if (name.includes('trouser') || name.includes('pant')) return 'Trousers';
    if (name.includes('cardigan')) return 'Jumpers & Cardigans';
    return 'Other';
  };

  // Helper function to get product brand
  const getProductBrand = (product) => {
    const brands = ['Adidas', 'Balmain', 'Balenciaga', 'Burberry', 'Kenzo', 'Givenchy', 'Zara'];
    return brands[product.productID % brands.length];
  };

  useEffect(() => {
    let filtered = StoreData.filter(product => {
      // Price filter
      if (product.productPrice < filters.priceRange[0] || product.productPrice > filters.priceRange[1]) {
        return false;
      }

      // Category filter
      if (filters.selectedCategories.length > 0) {
        const productCategory = getProductCategory(product);
        if (!filters.selectedCategories.includes(productCategory)) {
          return false;
        }
      }

      // Brand filter
      if (filters.selectedBrands.length > 0) {
        const productBrand = getProductBrand(product);
        if (!filters.selectedBrands.includes(productBrand)) {
          return false;
        }
      }

      // Search term filter
      if (filters.searchTerm && !product.productName.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }

      return true;
    });

    setFilteredProducts(filtered);
  }, [filters]);

  const value = {
    filters,
    updateFilters,
    clearAllFilters,
    filteredProducts,
    setFilteredProducts
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};
