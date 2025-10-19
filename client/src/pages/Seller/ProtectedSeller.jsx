import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/App.context";
import SellerLayout from "./SellerLayout";
import SellerLogin from "../../components/Seller/SellerLogin";

const ProtectedSellerRoute = () => {
  const { isSeller } = useAppContext();

  return isSeller ? <SellerLayout /> : <SellerLogin />;
};

export default ProtectedSellerRoute;
