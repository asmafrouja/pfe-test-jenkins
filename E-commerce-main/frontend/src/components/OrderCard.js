import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold mb-2">Commande #{order._id}</h2>
      <p className="text-gray-600 mb-2">
        Date: {new Date(order.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">
        Totale: {order?.total?.toFixed(2)} TND
      </p>
      <p className="text-gray-600 mb-2">Statut: {order?.status}</p>
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

export default OrderCard;
