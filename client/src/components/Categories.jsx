import React from "react";
import { useAppContext } from "../context/App.context";
import { categories } from "../assets/assets";

const Categories = () => {
  const { navigate } = useAppContext();
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

      {/* grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white shadow rounded-xl p-4 text-center hover:scale-105 transition"
            onClick={() => {
              navigate(`/products/${cat.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            style={{ backgroundColor: cat.bgColor }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-24 h-24 object-cover mx-auto  mb-3"
            />
            <h3 className="font-semibold">{cat.text}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
