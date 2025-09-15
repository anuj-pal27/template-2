import React, { useMemo, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { addToWishList, removeFromWishList } from "../../../Features/Wishlist/wishListSlice";

import product1 from "../../../Assets/ProductDetail/productdetail-1.jpg";
import product2 from "../../../Assets/ProductDetail/productdetail-2.jpg";
import product3 from "../../../Assets/ProductDetail/productdetail-3.jpg";
import product4 from "../../../Assets/ProductDetail/productdetail-4.jpg";

import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { PiShareNetworkLight } from "react-icons/pi";

import { Link, useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import "./Product.css";
import StoreData from "../../../Data/StoreData";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Resolve product from route param first
  const productId = parseInt(id, 10);
  const productFromStore = useMemo(
    () => StoreData.find((p) => p.productID === productId) || StoreData[0],
    [productId]
  );
  const productDetails = {
    id: productFromStore.productID,
    productID: productFromStore.productID,
    productName: productFromStore.productName,
    productPrice: productFromStore.productPrice,
    frontImg: productFromStore.frontImg,
    productReviews: productFromStore.productReviews,
  };

  // Product images Gallery - dynamic from StoreData with fallback
  const dynamicImages = useMemo(() => {
    const imgs = [];
    if (productFromStore?.frontImg) imgs.push(productFromStore.frontImg);
    if (productFromStore?.backImg) imgs.push(productFromStore.backImg);
    return imgs.length > 0 ? imgs : [product1, product2, product3, product4];
  }, [productFromStore]);
  const [currentImg, setCurrentImg] = useState(0);

  const prevImg = () => {
    setCurrentImg(currentImg === 0 ? dynamicImages.length - 1 : currentImg - 1);
  };

  const nextImg = () => {
    setCurrentImg(currentImg === dynamicImages.length - 1 ? 0 : currentImg + 1);
  };

  // Product Quantity

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  // Product WishList

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInWishlist = wishlistItems.some(item => item.id === productDetails.id);

  const handleWishClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishList(productDetails));
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
      dispatch(addToWishList(productDetails));
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

  // Product Sizes

  const sizes = ["XS", "S", "M", "L", "XL"];
  const sizesFullName = [
    "Extra Small",
    "Small",
    "Medium",
    "Large",
    "Extra Large",
  ];
  const [selectSize, setSelectSize] = useState("S");

  // Product Colors

  const [highlightedColor, setHighlightedColor] = useState("#C8393D");
  const colors = ["#222222", "#C8393D", "#E4E4E4"];
  const colorsName = ["Black", "Red", "Grey"];

  // Product Detail to Redux

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = () => {

    const productInCart = cartItems.find(
      (item) => item.productID === productDetails.productID
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
      dispatch(addToCart(productDetails));
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
    <>
      <div className="productSection">
        <div className="productShowCase">
          <div className="productGallery">
            <div className="productThumb">
              {dynamicImages.map((imgSrc, idx) => (
                <img key={idx} src={imgSrc} onClick={() => setCurrentImg(idx)} alt="" />
              ))}
            </div>
            <div className="productFullImg">
              <img src={dynamicImages[currentImg]} alt="" />
              <div className="buttonsGroup">
                <button onClick={prevImg} className="directionBtn">
                  <GoChevronLeft size={18} />
                </button>
                <button onClick={nextImg} className="directionBtn">
                  <GoChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="productDetails">
            <div className="productBreadcrumb">
              <div className="breadcrumbLink">
                <Link to="/">Home</Link>&nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="prevNextLink">
                <Link to={`/product/${Math.max(1, productDetails.productID - 1)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/product/${Math.max(1, productDetails.productID - 1)}`);
                  }}
                >
                  <GoChevronLeft />
                  <p>Prev</p>
                </Link>
                <Link to={`/product/${productDetails.productID + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/product/${productDetails.productID + 1}`);
                  }}
                >
                  <p>Next</p>
                  <GoChevronRight />
                </Link>
              </div>
            </div>
            <div className="productName">
              <h1>{productDetails.productName}</h1>
            </div>
            <div className="productRating">
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <p>{productDetails.productReviews}</p>
            </div>
            <div className="productPrice">
              <h3>${productDetails.productPrice}</h3>
            </div>
            <div className="productDescription">
              <p>
                Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                elementum gravida nec dui. Aenean aliquam varius ipsum, non
                ultricies tellus sodales eu. Donec dignissim viverra nunc, ut
                aliquet magna posuere eget.
              </p>
            </div>
            <div className="productSizeColor">
              <div className="productSize">
                <p>Sizes</p>
                <div className="sizeBtn">
                  {sizes.map((size, index) => (
                    <Tooltip
                      key={size}
                      title={sizesFullName[index]}
                      placement="top"
                      TransitionComponent={Zoom}
                      enterTouchDelay={0}
                      arrow
                    >
                      <button
                        style={{
                          borderColor: selectSize === size ? "#000" : "#e0e0e0",
                        }}
                        onClick={() => setSelectSize(size)}
                      >
                        {size}
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
              <div className="productColor">
                <p>Color</p>
                <div className="colorBtn">
                  {colors.map((color, index) => (
                    <Tooltip
                      key={color}
                      title={colorsName[index]}
                      placement="top"
                      enterTouchDelay={0}
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <button
                        className={
                          highlightedColor === color ? "highlighted" : ""
                        }
                        style={{
                          backgroundColor: color.toLowerCase(),
                          border:
                            highlightedColor === color
                              ? "0px solid #000"
                              : "0px solid white",
                          padding: "8px",
                          margin: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => setHighlightedColor(color)}
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
            <div className="productCartQuantity">
              <div className="productQuantity">
                <button onClick={decrement}>-</button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleInputChange}
                />
                <button onClick={increment}>+</button>
              </div>
              <div className="productCartBtn">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
            <div className="productWishShare">
              <div className="productWishList">
                <button onClick={handleWishClick}>
                  <FiHeart color={isInWishlist ? "red" : ""} size={17} />
                  <p>{isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</p>
                </button>
              </div>
              <div className="productShare">
                <PiShareNetworkLight size={22} />
                <p>Share</p>
              </div>
            </div>
            <div className="productTags">
              <p>
                <span>SKU: </span>N/A
              </p>
              <p>
                <span>CATEGORIES: </span>Casual & Urban Wear, Jackets, Men
              </p>
              <p>
                <span>TAGS: </span>biker, black, bomber, leather
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
