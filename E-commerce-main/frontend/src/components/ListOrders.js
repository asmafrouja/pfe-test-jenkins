import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import SummaryApi from "../common";
import { useSelector } from "react-redux";

const OrdersList = () => {
  const user = useSelector((state) => state?.user?.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(SummaryApi.getUserOrders.url, {
          method: SummaryApi.getUserOrders.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?._id,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      ) : (
        <p>No orders found for this user.</p>
      )}
    </div>
  );
};

export default OrdersList;
