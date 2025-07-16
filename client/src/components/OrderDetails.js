import React from "react";
import { useLocation } from "react-router-dom";


function OrderDetails() {
  const location = useLocation();
  const { order } = location.state; // Destructure the order from location.state

  // console.log(location);

  return (
    <div className="order-receipt">
      <h1 className="receipt-title">Order Details</h1>
      <div className="receipt-info">
        <div>
          <strong>Order ID:</strong> {order._id}
        </div>
        <div>
          <strong>Date Placed:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </div>
        <div>
          <strong>Status:</strong> {order.status}
        </div>
      </div>

      <h2 className="receipt-items-title">Items</h2>

      <table className="receipt-items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Qty(pcs)</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.boughtProducts.map((product) => (
            <tr key={product.productId}>
              <td>{product.productName}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>${(product.price * product.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="receipt-total">
        <strong>Total Amount : $ {order.totalAmount.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default OrderDetails;
