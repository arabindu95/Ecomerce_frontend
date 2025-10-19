import React from "react";
import { useAppContext } from "../context/App.context";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();
  const searchCategory = categories.find(
    (item) => item.path.toLocaleLowerCase() === category
  );

  const filterProduct = products.filter(
    (product) => product.category.toLocaleLowerCase() === category
  );
  return (
    <div className=" mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max p-8">
          <p className="text-2xl font-medium">
            {searchCategory.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
      )}
      {filterProduct.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8  w-full  justify-items-center  ">
          {filterProduct.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-primary">not found</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
