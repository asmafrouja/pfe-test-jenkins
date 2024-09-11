import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import OrderCardAdmin from "../components/OrderCardAdmin";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(SummaryApi.getAllOrders.url, {
          method: SummaryApi.getAllOrders.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
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
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">All Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCardAdmin key={order._id} order={order} />)
      ) : (
        <p>Pas des commandes.</p>
      )}
    </div>
  );
};

export default OrdersList;
