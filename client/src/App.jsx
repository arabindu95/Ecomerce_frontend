import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContextProvider } from "./context/App.context.jsx";
import SellerLogin from "./components/Seller/SellerLogin.jsx";

const App = () => {
  const location = useLocation();
  const isSeller = location.pathname.includes("seller");

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {" "}
      <AppContextProvider>
        {!isSeller && <Header />}
        <Login />
        <main className="min-h-[88vh]">
          <Outlet />
        </main>
        {!isSeller && <Footer />}
      </AppContextProvider>
    </div>
  );
};

export default App;
