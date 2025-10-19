import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import ProductCategory from "../pages/ProductCategory";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import NotFound from "../components/NotFound";
import AddAddress from "../pages/AddAddress";
import MyOrders from "../pages/MyOrders";
import ProtectedSellerRoute from "../pages/Seller/ProtectedSeller";
import AddProduct from "../pages/Seller/AddProduct";
import Order from "../pages/Seller/Order";
import ProductList from "../pages/Seller/ProductList";
import SellerLayout from "../pages/Seller/SellerLayout";
import Loading from "../components/Loading";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "products", element: <AllProducts /> },
      { path: "products/:category", element: <ProductCategory /> },
      { path: "products/:category/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "add-address", element: <AddAddress /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "loader", element: <Loading /> },
      { path: "*", element: <NotFound /> },
      {
        path: "seller",
        element: <ProtectedSellerRoute />,
        children: [
          { path: "add_product", element: <AddProduct /> },
          { path: "product_list", element: <ProductList /> },
          { path: "orders", element: <Order /> },
        ],
      },
    ],
  },
]);

export default Router;
