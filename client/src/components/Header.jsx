import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import search from "../assets/search_icon.svg";
import menu from "../assets/menu_icon.svg";
import carticon from "../assets/cart_icon.svg";
import profileicon from "../assets/profile_icon.png";
import { useAppContext } from "../context/App.context";
import { TypeAnimation } from "react-type-animation";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setshowUserLogin,
    searchQuery,
    setSearchQuery,
    GetCartItem,
    axios,
  } = useAppContext();

  // ---------------------Logout function------------------
  const Logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  return (
    <header className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all font-semibold ">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={logo} alt="logo" width={150} />
      </NavLink>

      {/*----------------------------- Desktop Menu -----------------------------------*/}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-black"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-black"
          }
        >
          All-Products
        </NavLink>
        <NavLink
          to="/ox"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-black"
          }
        >
          Contact
        </NavLink>

        {/*---------------------------------- Search ------------------------*/}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={search} alt="search" />
        </div>

        {/* ------------------------------ CarrtIcon ------------------------------  */}
        {user && (
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img src={carticon} alt="carticon" width={28} />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary-dull w-[18px] h-[18px] rounded-full">
              {GetCartItem()}
            </button>
          </div>
        )}

        {/*------------------------------  Login & LogOut Button------------------------------  */}

        {!user ? (
          <button
            onClick={() => {
              setshowUserLogin(true);
              setOpen(false);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={profileicon}
              width={35}
              alt="profileicon"
              onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
              <ul className=" absolute top-10  w-32 bg-white shadow border border-gray-200 py-2.5 z-50">
                <li
                  onClick={() => navigate("/my-orders")}
                  className="pl-3 hover:bg-primary cursor-pointer hover:text-white"
                >
                  My-Order
                </li>
                <li
                  onClick={Logout}
                  className="pl-3 hover:bg-primary cursor-pointer hover:text-white"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/*------------------------------  Mobile Menu ------------------------------  */}
      <div className="flex items-center gap-6 sm:hidden">
        <div className="relative cursor-pointer">
          <img src={carticon} alt="carticon" width={28} />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary-dull w-[18px] h-[18px] rounded-full">
            {GetCartItem()}
          </button>
        </div>
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
        >
          <img src={menu} alt="menu" />
        </button>
      </div>

      {/*------------------------------  Mobile Menu Links ------------------------------ */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-10 px-5 text-sm md:hidden`}
      >
        <NavLink to="/" onClick={() => setOpen(false)} className="block">
          Home
        </NavLink>
        <NavLink to="#" onClick={() => setOpen(false)} className="block">
          All-Products
        </NavLink>
        {user && (
          <NavLink to="#" onClick={() => setOpen(false)} className="block">
            My-Orders
          </NavLink>
        )}
        <NavLink to="#" className="block" onClick={() => setOpen(false)}>
          Contact
        </NavLink>
        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setshowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
