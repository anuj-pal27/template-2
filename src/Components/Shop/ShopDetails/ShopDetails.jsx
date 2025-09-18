import React, { useMemo, useState } from "react";
import "./ShopDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { addToWishList, removeFromWishList } from "../../../Features/Wishlist/wishListSlice";

import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import StoreData from "../../../Data/StoreData";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoFilterSharp, IoClose } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const ShopDetails = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  const handleWishlistClick = (product) => {
    const isInWishlist = wishlistItems.some(item => item.productID === product.productID);
    
    if (isInWishlist) {
      dispatch(removeFromWishList({ id: product.productID }));
      toast.success("Removed from wishlist!", {
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
      dispatch(addToWishList({
        id: product.productID,
        productID: product.productID,
        productName: product.productName,
        productPrice: product.productPrice,
        frontImg: product.frontImg,
        productReviews: product.productReviews,
      }));
      toast.success("Added to wishlist!", {
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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const cartItems = useSelector((state) => state.cart.items);

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

  const onCategorySelect = (category) => setSelectedCategory(category);
  const onColorToggle = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };
  const onSizeSelect = (size) => {
    setSelectedSize(size);
  };
  const onBrandToggle = (brand) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...StoreData];

    // Category
    if (selectedCategory && selectedCategory !== "All Products") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    // Colors
    if (selectedColors.length > 0) {
      products = products.filter((p) => {
        if (!Array.isArray(p.colors)) return false;
        return selectedColors.some((c) => p.colors.includes(c));
      });
    }

    // Sizes
    if (selectedSize) {
      products = products.filter((p) => Array.isArray(p.sizes) && p.sizes.includes(selectedSize));
    }

    // Brands
    if (selectedBrands.length > 0) {
      products = products.filter((p) => selectedBrands.includes(p.brand));
    }

    // Sorting
    switch (sortBy) {
      case "a-z":
        products.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "z-a":
        products.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case "lowToHigh":
        products.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case "highToLow":
        products.sort((a, b) => b.productPrice - a.productPrice);
        break;
      case "oldToNew":
        products.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        break;
      case "newToOld":
        products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      default:
        break;
    }

    return products;
  }, [selectedCategory, selectedColors, selectedSize, selectedBrands, sortBy]);

  return (
    <>
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter
              selectedCategory={selectedCategory}
              selectedColors={selectedColors}
              selectedSize={selectedSize}
              selectedBrands={selectedBrands}
              onCategorySelect={onCategorySelect}
              onColorToggle={onColorToggle}
              onSizeSelect={onSizeSelect}
              onBrandToggle={onBrandToggle}
            />
          </div>
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>
                &nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp />
                <p>Filter</p>
              </div>
              <div className="shopDetailsSort">
                <select name="sort" id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="default">Default Sorting</option>
                  <option value="Featured">Featured</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="lowToHigh">Price, Low to high</option>
                  <option value="highToLow">Price, high to low</option>
                  <option value="oldToNew">Date, old to new</option>
                  <option value="newToOld">Date, new to old</option>
                </select>
                <div className="filterRight" onClick={toggleDrawer}>
                  <div className="filterSeprator"></div>
                  <IoFilterSharp />
                  <p>Filter</p>
                </div>
              </div>
            </div>
            <div className="shopDetailsProducts">
              {filteredAndSortedProducts.length === 0 ? (
                <div className="noProducts">No products found</div>
              ) : (
              <div className="shopDetailsProductsContainer">
                {filteredAndSortedProducts.map((product) => (
                  <div className={`sdProductContainer ${!product.backImg ? 'no-back-image' : ''}`} key={product.productID}>
                    <div className="sdProductImages">
                      <Link to={`/product/${product.productID}`} onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt=""
                          className="sdProduct_front"
                        />
                        {product.backImg && (
                          <img
                            src={product.backImg}
                            alt=""
                            className="sdProduct_back"
                          />
                        )}
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div
                      className="sdProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartPlus />
                    </div>
                    <div className="sdProductInfo">
                      <div className="sdProductCategoryWishlist">
                        <p>Dresses</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product)}
                          style={{
                            color: wishlistItems.some(item => item.productID === product.productID)
                              ? "red"
                              : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="sdProductNameInfo">
                        <Link to={`/product/${product.productID}`} onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>

                        <p>${product.productPrice}</p>
                        <div className="sdProductRatingReviews">
                          <div className="sdProductRatingStar">
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
              )}
            </div>
            <div className="shopDetailsPagination">
              <div className="sdPaginationPrev">
                <p onClick={scrollToTop}>
                  <FaAngleLeft />
                  Prev
                </p>
              </div>
              <div className="sdPaginationNumber">
                <div className="paginationNum">
                  <p onClick={scrollToTop}>1</p>
                  <p onClick={scrollToTop}>2</p>
                  <p onClick={scrollToTop}>3</p>
                  <p onClick={scrollToTop}>4</p>
                </div>
              </div>
              <div className="sdPaginationNext">
                <p onClick={scrollToTop}>
                  Next
                  <FaAngleRight />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Drawer */}
      <div className={`filterDrawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawerHeader">
          <p>Filter By</p>
          <IoClose onClick={closeDrawer} className="closeButton" size={26} />
        </div>
        <div className="drawerContent">
          <Filter
            selectedCategory={selectedCategory}
            selectedColors={selectedColors}
            selectedSize={selectedSize}
            selectedBrands={selectedBrands}
            onCategorySelect={onCategorySelect}
            onColorToggle={onColorToggle}
            onSizeSelect={onSizeSelect}
            onBrandToggle={onBrandToggle}
          />
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
