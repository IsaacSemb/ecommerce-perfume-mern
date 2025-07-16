import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function OrderLog() {
  const [orders, setorders] = useState([]);
  const navigate = useNavigate();

  // we need to know that some one is logged in so ask the session storage for their userId
  const userId = sessionStorage.getItem("userId");

  // use effect to run some errands on rendering the page
  // functions like fetching data from server and calculating the sum of incoming items
  useEffect(
    function effectFunction() {
      async function fetchorders() {
        try {
          // attempt to fetch the actual DB data
          const serverResponse = await axios.get(
            `http://localhost:5555/orders/${userId}`
          );

          // console.log("past-Orders-below here");
          // console.log(serverResponse.data);

          // set the available items to cart items
          setorders(serverResponse.data.orders);
        } catch (error) {
          console.log("something went wrong");
        }
      }
      fetchorders();
    },
    [userId, navigate] // dont forget the almighty dependency list LAMAO
  );

  return (
    <div>
      {orders.length > 0 ? (
        <>
          <h1>Orders</h1>
          <p style={{ textAlign: "center" }}>
            (Click Order ID for details)
          </p>{" "}
        </>
      ) : null}

      {orders.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "20px 0",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#d8d5ce",
                  color: "#333",
                  fontWeight: "bold",
                  width: "35%",
                }}
              >
                Order ID
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#d8d5ce",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                Date Placed
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  backgroundColor: "#d8d5ce",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#f0f0f0",
                }}
              >
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  <Link
                    to={"/order-details"}
                    state={{ order }}
                    style={{ color: "#007bff", textDecoration: "none" }}
                    className="order-link"
                  >
                    {order._id}
                  </Link>
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-orders-found">
          <p>No orders found</p>
        </div>
      )}
    </div>
  );
}

export default OrderLog;
