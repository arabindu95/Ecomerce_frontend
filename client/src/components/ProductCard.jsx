import React from "react";
import { useAppContext } from "../context/App.context";
import cartIcon from "../assets/cart_icon.svg";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, removeCartItem, cartItems } = useAppContext();
  const navigate = useNavigate();

  return (
    <div
      className="gap-6"
      onClick={() => {
        if (product?._id && product?.category)
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
        scrollTo(0, 0);
        console.log("clicked");
      }}
    >
      <div key={product._id} className=" border border-gray-200  rounded-lg">
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-48"
            src={product?.image?.[0]}
            alt={product?.name}
          />
        </div>
        <div className="text-gray-500/60 text-sm">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-gray-500">{product?.category}</p>
            <p className="text-gray-700 font-bold text-xl truncate max-w-[150px]">
              {product?.name}
            </p>
          </div>

          {/* Price */}
          <div className=" mt-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                Rs:{product?.price}/-
              </span>
              <p className="md:text-xl font-semibold text-base  text-indigo-500">
                Rs:{product?.offerPrice}/-
              </p>
            </div>

            {/* Add/ Remove/ Button*/}
            <div
              className="text-indigo-500 flex items-center justify-center pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              {!cartItems?.[product?._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium hover:scale-110 transition-transform duration-400 "
                  onClick={() => addToCart(product?._id)}
                >
                  <img src={cartIcon} alt="carticon" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-green-600 text-white rounded select-none">
                  <button
                    onClick={() => removeCartItem(product?._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems?.[product?._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product?._id)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
