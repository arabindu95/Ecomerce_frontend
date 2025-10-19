import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setisSeller] = useState(false);
  const [showUserLogin, setshowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [removeItemMessage, setRemoveItemMessage] = useState(null);

  // ------------------Fetch Seller Status-------------------
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setisSeller(true);
      } else {
        setisSeller(false);
      }
    } catch (error) {
      setisSeller(false);
      console.log(error.message);
    }
  };

  // ------------------Fetch user auth Status and  user data & cartItems-------------------
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch (error) {
      setUser(null);
      console.log(error.message);
    }
  };

  // ------------------Fetch All Products-------------------
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        console.warn("Product fetch failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // -------------------Add Product To Cart-----------------
  const addToCart = (itemId) => {
    if (!itemId) return;
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    alert("product added");
  };

  // ----------------------upDateCartItem------------------------
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
  };

  // ------------------remove product from cart----------------
  const removeCartItem = (itemId) => {
    if (!itemId || !cartItems[itemId]) return;
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    setRemoveItemMessage(itemId);
    setTimeout(() => setRemoveItemMessage(null), 2000);
  };

  // --------------Get CartItem Count--------------

  const GetCartItem = () => {
    let count = 0;
    for (const item in cartItems) {
      count += cartItems[item];
    }
    return count;
  };

  // ------------------------------------Get Cart Amount-----------------------------
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id === item);
      if (cartItems[item] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  //---------------------------update DataBase CartItems---------------------------
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", {
          userId: user._id,
          cartItems,
        });
        if (!data.success) {
          alert(data.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    if (user) {
      updateCart();
    }
  }, [cartItems]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setisSeller,
    showUserLogin,
    setshowUserLogin,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeCartItem,
    setSearchQuery,
    searchQuery,
    GetCartItem,
    setCartItems,
    getCartAmount,
    removeItemMessage,
    fetchProducts,
    axios,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  return useContext(AppContext);
};
