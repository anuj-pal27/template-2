import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import StoreData from "../Data/StoreData";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Features/Cart/cartSlice";
import toast from "react-hot-toast";
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishList, setWishList] = useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q") || "";
    setSearchTerm(query);
    
    if (query) {
      const filtered = StoreData.filter(product =>
        product.productName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(StoreData);
    }
  }, [location.search]);

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const handleAddToCart = (product) => {
    const productInCart = cartItems.find(
      (item) => item.productID === product.productID
    );

    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached", {
        duration: 2000,
        style: {
          backgroundColor: "#ff4b4b",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff4b4b",
        },
      });
    } else {
      dispatch(addToCart(product));
      toast.success(`Added to cart!`, {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="search-results">
      <div className="search-results-container">
        <div className="search-results-header">
          <h1>Search Results</h1>
          {searchTerm && (
            <p>
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found for "{searchTerm}"
            </p>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="search-results-grid">
            {filteredProducts.map((product) => (
              <div key={product.productID} className="search-product-card">
                <div className="search-product-images">
                  <Link to="/Product" onClick={scrollToTop}>
                    <img
                      src={product.frontImg}
                      alt={product.productName}
                      className="search-product-front"
                    />
                    {product.backImg && (
                      <img
                        src={product.backImg}
                        alt={product.productName}
                        className="search-product-back"
                      />
                    )}
                  </Link>
                  <div className="search-product-overlay">
                    <h4 onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </h4>
                  </div>
                </div>
                <div
                  className="search-product-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaCartPlus />
                </div>
                <div className="search-product-info">
                  <div className="search-product-category-wishlist">
                    <p>Product</p>
                    <FiHeart
                      onClick={() => handleWishlistClick(product.productID)}
                      style={{
                        color: wishList[product.productID] ? "red" : "#767676",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div className="search-product-name-info">
                    <Link to="/product" onClick={scrollToTop}>
                      <h5>{product.productName}</h5>
                    </Link>
                    <p>${product.productPrice}</p>
                    <div className="search-product-rating-reviews">
                      <div className="search-product-rating-star">
                        <FaStar color="#FEC78A" size={10} />
                        <FaStar color="#FEC78A" size={10} />
                        <FaStar color="#FEC78A" size={10} />
                        <FaStar color="#FEC78A" size={10} />
                        <FaStar color="#FEC78A" size={10} />
                      </div>
                      <span>{product.productReviews}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h2>No products found</h2>
            <p>Try searching with different keywords or browse our categories.</p>
            <Link to="/shop" className="browse-shop-btn">
              Browse Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
