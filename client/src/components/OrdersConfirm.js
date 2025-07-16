import React from "react";

function Orders() {
  return (
    <div className="payment-page-container">
      <h2 className="title">Order Completion</h2>
      <p style={{ textAlign: "center" }}>
        Order is completed and saved to pending, complete payment to confirm it
      </p>

      <div className="payment-page">
        <h2>Payment Information</h2>
        <form className="payment-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardName">Name on Card</label>
            <input type="text" placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input type="text" name="expiryDate" placeholder="MM/YY" required />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" name="cvv" placeholder="123" required />
          </div>
          <button type="submit" className="submit-button">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Orders;
