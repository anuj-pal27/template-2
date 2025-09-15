import Product_1 from "../Assets/Products/product_1.jpg";
import Product_1_1 from "../Assets/Products/product_1-1.jpg";
import Product_2 from "../Assets/Products/product_2.jpg";
import Product_2_1 from "../Assets/Products/product_2-1.jpg";
import Product_3 from "../Assets/Products/product_3.jpg";
import Product_3_1 from "../Assets/Products/product_3-1.jpg";
import Product_4 from "../Assets/Products/product_4.jpg";
import Product_4_1 from "../Assets/Products/product_4-1.jpg";
import Product_5 from "../Assets/Products/product_5.jpg";
import Product_5_1 from "../Assets/Products/product_5-1.jpg";
import Product_6 from "../Assets/Products/product_6.jpg";
import Product_6_1 from "../Assets/Products/product_6-1.jpg";
import Product_7 from "../Assets/Products/product_7.jpg";
import Product_7_1 from "../Assets/Products/product_7-1.jpg";
import Product_8 from "../Assets/Products/product_8.jpg";
import Product_8_1 from "../Assets/Products/product_8-1.jpg";

import limited1 from "../Assets/LimitedEdition/limited-1.jpg";
import limited2 from "../Assets/LimitedEdition/limited-2.jpg";
import limited3 from "../Assets/LimitedEdition/limited-3.jpg";
import limited4 from "../Assets/LimitedEdition/limited-4.jpg";
import limited5 from "../Assets/LimitedEdition/limited-5.jpg";

let StoreData = [
  {
    productID: 1,
    frontImg: Product_1,
    backImg: Product_1_1,
    productName: "Cropped Faux Leather Jacket",
    productPrice: 29,
    productReviews: "8k+ reviews",
    category: "Jackets",
    colors: ["Black"],
    sizes: ["S", "M", "L"],
    brand: "Adidas",
    dateAdded: "2024-10-01T10:00:00Z",
  },
  {
    productID: 2,
    frontImg: Product_2,
    backImg: Product_2_1,
    productName: "Calvin Shorts",
    productPrice: 62,
    productReviews: "2k+ reviews",
    category: "Pants & Shorts",
    colors: ["Blue", "Gray"],
    sizes: ["M", "L", "XL"],
    brand: "Nike",
    dateAdded: "2024-10-05T12:00:00Z",
  },
  {
    productID: 3,
    frontImg: Product_3,
    backImg: Product_3_1,
    productName: "Shirt In Botanical Cheetah Print",
    productPrice: 60,
    productReviews: "7k+ reviews",
    category: "Tops & Tees",
    colors: ["Green", "Yellow"],
    sizes: ["S", "M"],
    brand: "Puma",
    dateAdded: "2024-10-10T09:00:00Z",
  },
  {
    productID: 4,
    frontImg: Product_4,
    backImg: Product_4_1,
    productName: "Cotton Jersey T-Shirt",
    productPrice: 17,
    productReviews: "5k+ reviews",
    category: "Tops & Tees",
    colors: ["White", "Black"],
    sizes: ["XS", "S", "M", "L"],
    brand: "Champion",
    dateAdded: "2024-10-15T14:00:00Z",
  },
  {
    productID: 5,
    frontImg: Product_5,
    backImg: Product_5_1,
    productName: "Cableknit Shawl",
    productPrice: 100,
    productReviews: "9k+ reviews",
    category: "Accessories",
    colors: ["Gray"],
    sizes: ["L", "XL"],
    brand: "Reebok",
    dateAdded: "2024-11-01T08:00:00Z",
  },
  {
    productID: 6,
    frontImg: Product_6,
    backImg: Product_6_1,
    productName: "Colorful Jacket",
    productPrice: 69,
    productReviews: "1k+ reviews",
    category: "Jackets",
    colors: ["Red", "Blue", "Yellow"],
    sizes: ["M", "L", "XL"],
    brand: "Under Armour",
    dateAdded: "2024-11-05T16:00:00Z",
  },
  {
    productID: 7,
    frontImg: Product_7,
    backImg: Product_7_1,
    productName: "Zessi Dresses",
    productPrice: 99,
    productReviews: "3k+ reviews",
    category: "Dresses",
    colors: ["Pink", "Purple"],
    sizes: ["S", "M", "L"],
    brand: "Nike",
    dateAdded: "2024-11-10T11:30:00Z",
  },
  {
    productID: 8,
    frontImg: Product_8,
    backImg: Product_8_1,
    productName: "Kirby T-Shirt",
    productPrice: 37,
    productReviews: "4k+ reviews",
    category: "Tops & Tees",
    colors: ["Black", "Orange"],
    sizes: ["XS", "S", "M"],
    brand: "Vans",
    dateAdded: "2024-11-12T13:00:00Z",
  },
  {
    productID: 9,
    frontImg: limited1,
    productName: "Hosking Blue Area Rug",
    productPrice: 29,
    productReviews: "8k+ reviews",
    category: "Home & Living",
    colors: ["Blue"],
    sizes: ["L"],
    brand: "Converse",
    dateAdded: "2024-09-20T10:00:00Z",
  },
  {
    productID: 10,
    frontImg: limited2,
    productName: "Hanneman Pouf",
    productPrice: 92,
    productReviews: "5k+ reviews",
    category: "Home & Living",
    colors: ["Gray"],
    sizes: ["M"],
    brand: "New Balance",
    dateAdded: "2024-09-25T10:00:00Z",
  },
  {
    productID: 11,
    frontImg: limited3,
    productName: "Cushion Futon Slipcover",
    productPrice: 25,
    productReviews: "1k+ reviews",
    category: "Home & Living",
    colors: ["Green"],
    sizes: ["S"],
    brand: "Puma",
    dateAdded: "2024-09-28T10:00:00Z",
  },
  {
    productID: 12,
    frontImg: limited4,
    productName: "Hub Accent Mirror",
    productPrice: 27,
    productReviews: "7k+ reviews",
    category: "Home & Living",
    colors: ["Yellow"],
    sizes: ["M"],
    brand: "Adidas",
    dateAdded: "2024-09-30T10:00:00Z",
  },
  {
    productID: 13,
    frontImg: limited5,
    productName: "Bold Male Black Analog",
    productPrice: 39,
    productReviews: "71+ reviews",
    category: "Watches",
    colors: ["Black"],
    sizes: ["M"],
    brand: "Jordan",
    dateAdded: "2024-10-20T10:00:00Z",
  },
];

export default StoreData;
