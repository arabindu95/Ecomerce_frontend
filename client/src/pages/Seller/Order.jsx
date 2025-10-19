import React from "react";
import { useState, useEffect } from "react";
import { dummyOrders } from "../../assets/assets";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/App.context";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useAppContext();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex-1 h-[95vh] overflow-y-scroll scrollbar-hide">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex gap-5">
              <img
                className="w-12 h-12 object-cover opacity-60"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col justify-center">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span className="text-primary">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </>
            </div>

            <div className="text-sm md:text-base text-black/60">
              <p className="font-medium mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city},{" "}
                {order.address.state},{order.address.zipcode},{" "}
                {order.address.country},{order.address.phone}
              </p>
            </div>

            <p className="font-medium text-base my-auto text-black/70">
              RS: {order.amount}/-
            </p>

            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType}</p>
              <p>Date: {order.orderDate}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
