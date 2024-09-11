import React, { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const validStatuses = [
  "En attente",
  "En cours de livraison",
  "Livré",
  "Annulé",
  "En cours de préparation",
];

const OrderCardAdmin = ({ order }) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const updateStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.updateStatus.url, {
        method: SummaryApi.updateStatus.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id: order._id, status: selectedStatus }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success("Le statut a été modifié avec succès.");
      } else {
        toast.error(
          "Une erreur s'est produite lors de la mise à jour du statut"
        );
      }
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la mise à jour du statut."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">Commande #{order._id}</h2>
      <p className="text-gray-600 mb-2">Name: {order.name}</p>
      <p className="text-gray-600 mb-2">
        Date: {new Date(order.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">
        Totale: {order?.total?.toFixed(2)} TND
      </p>
      <div className="text-gray-600 mb-2">
        Statut:
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="ml-2 p-1 border rounded"
        >
          {validStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          onClick={updateStatus}
          className={`ml-2 px-4 py-1 rounded-full ${
            loading || selectedStatus === order.status
              ? "bg-green-600/70 cursor-not-allowed"
              : "bg-green-600"
          } text-white`}
          disabled={loading || selectedStatus === order.status}
        >
          {loading ? "Updating..." : "Modifier"}
        </button>
      </div>
      <div className="border-t border-gray-200 pt-2 mt-2">
        <h3 className="font-semibold mb-2">Produits</h3>
        {order.products.map((product) => (
          <div
            key={product.productId._id}
            className="flex justify-between mb-2 items-start"
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-lg">
                {product?.productId?.productName}
              </span>
              <span className="text-sm text-gray-600">
                {product?.productId?.brandName}
              </span>
            </div>
            <span className="text-green-600 font-semibold">
              {product.quantity} x {product?.productId?.price?.toFixed(2)} TND
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCardAdmin;
