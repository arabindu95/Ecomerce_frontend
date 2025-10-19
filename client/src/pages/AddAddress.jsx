import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useAppContext } from "../context/App.context";
import App from "./../App";
import { useEffect } from "react";

// input Field Component
const InputField = ({ name, type, placeholder, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 outline-none rounded text-gray-500 focus:border-primary transition"
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const { user, axios, navigate } = useAppContext();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAdress) => ({
      ...prevAdress,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", {
        address,
        userId: user._id,
      });
      if (data.success) {
        alert("complete");
        navigate("/cart");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log("user:", user);
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="mt-16 pb-16 ml-36">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shiping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md ">
          <form className="space-y-3 mt-6 text-sm" onSubmit={submitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder="First Name"
                name="firstName"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder="Last Name"
                name="lastName"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              type="text"
              placeholder="email"
              name="email"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              type="text"
              placeholder="Street"
              name="street"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder="City"
                name="city"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder="State"
                name="state"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder="Pincode"
                name="pincode"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                type="text"
                placeholder=" Country"
                name="country"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              type="text"
              placeholder=" Phone"
              name="phone"
            />

            <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase">
              Save Address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 md:mt-0 mb-16"
          src={assets.add_address_iamge}
          alt="Address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
