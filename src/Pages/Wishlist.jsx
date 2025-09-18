import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishList, clearWishList } from "../Features/Wishlist/wishListSlice";
import { addToCart } from "../Features/Cart/cartSlice";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import "./Wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleRemoveFromWishlist = (product) => {
    dispatch(removeFromWishList({ id: product.id }));
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
  };

  const handleClearWishlist = () => {
    dispatch(clearWishList());
    toast.success("Wishlist cleared!", {
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

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <FiHeart size={64} color="#ccc" />
            <h2>Your wishlist is empty</h2>
            <p>Add items to your wishlist to see them here</p>
            <Link to="/shop" onClick={scrollToTop} className="shop-now-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-actions">
              <button 
                className="clear-wishlist-btn" 
                onClick={handleClearWishlist}
              >
                <FiTrash2 size={16} />
                Clear Wishlist
              </button>
            </div>

            <div className="wishlist-grid">
              {wishlistItems.map((product) => (
                <div key={product.id} className="wishlist-item">
                  <div className="wishlist-item-image">
                    <Link to={`/product/${product.productID}`} onClick={scrollToTop}>
                      <img src={product.frontImg} alt={product.productName} />
                    </Link>
                    <div className="wishlist-item-actions">
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="wishlist-item-info">
                    <div className="wishlist-item-header">
                      <Link to={`/product/${product.productID}`} onClick={scrollToTop}>
                        <h3>{product.productName}</h3>
                      </Link>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveFromWishlist(product)}
                        title="Remove from wishlist"
                      >
                        <FiHeart size={20} color="red" />
                      </button>
                    </div>
                    
                    <div className="wishlist-item-price">
                      <span className="price">${product.productPrice}</span>
                    </div>
                    
                    <div className="wishlist-item-rating">
                      <div className="stars">
                        <FaStar color="#FEC78A" size={12} />
                        <FaStar color="#FEC78A" size={12} />
                        <FaStar color="#FEC78A" size={12} />
                        <FaStar color="#FEC78A" size={12} />
                        <FaStar color="#FEC78A" size={12} />
                      </div>
                      <span className="reviews">{product.productReviews}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="wishlist-footer">
              <Link to="/shop" onClick={scrollToTop} className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
