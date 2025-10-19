import React from "react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/App.context";

const BestSeller = () => {
  const { products } = useAppContext();

  //Best seller filter
  const BestSellerProducts = products.filter((product) => product.isBestSeller);
  return (
    <section className=" p-6">
      <p className=" text-2xl font-bold mb-6"> Best Seller </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-9 justify-items-center ">
        {BestSellerProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
