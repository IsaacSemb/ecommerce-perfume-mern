import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import rubbishBin from "../icons/bin.svg";

function Cart() {
  const navigate = useNavigate();

  // set state for incoming cart items
  const [cartItems, setCartItems] = useState([]);

  // set state for when we sum them up
  const [totalPrice, setTotalPrice] = useState(0);

  // we need to know that some one is logged in so ask the session storage for their userId
  const userId = sessionStorage.getItem("userId");

  // use effect to run some errands on rendering the page
  // functions like fetching data from server and calculating the sum of incoming items
  useEffect(
    function effectFunction() {
      async function fetchCartData() {
        try {
          // attempt to fetch the actual DB data
          const response = await axios.get(
            `http://localhost:5555/cart/${userId}`
          );

          // console.log("below are cart items from aggregate");
          // console.log(response.data);

          // add and original state for the quantity  --- then its change can be tracked
          const cartWithGhostTracker = response.data.map((item) => ({
            ...item, // copied all original content
            originalQuantity: item.quantity, // added a quantity that i wont change --- ill just use it to compare with the changing one
          }));

          // set the available items to cart items
          setCartItems(cartWithGhostTracker);
        } catch (error) {
          console.log("something went wrong");
        }
      }
      fetchCartData();
    },
    [userId, navigate] // dont forget the almighty dependency list LAMAO
  );

  // use another use effect to sum up the content
  // we separated it because we want it to happen when the cart items change
  // so that it can get the right total
  useEffect(
    function effectFunction() {
      // getting the total of all items on the cart
      const total = cartItems.reduce(
        // reduce cart items to one single value (the total)
        function (sum, item) {
          let newTotal = sum + item.price * item.quantity;
          return newTotal;
        },
        0
      ); // initial value

      setTotalPrice(total);
    },
    [cartItems] //
  );

  // finally when someone buys
  // handling when someone clicks the proceed to check out button
  async function handleCheckOut() {
    // send the order to the database
    const userId = sessionStorage.getItem("userId");

    // ONE FINAL CHECK FOR USER LOGGED IN
    if (!userId) {
      alert("Please log in to confirm your order.");
      navigate("/login");
      return;
    }

    // PREPARE THE DATA THAT IS GOING TO BE SENT

    /*

    // make a list of objects from cart items
    cartItems.forEach(
      (item) => {
        let itemObject = {
          productId : item._id,
          quantity : item.quantity,
          price : item.price,
        }
        boughtProducts.push(itemObject)
      }
    )
      */

    //  console.log(cartItems);

    const boughtProducts = cartItems.map(
      // create an object and assign it to that making it an array
      (item) => ({
        cartId: item._id,
        productName: item.name,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })
    );

    // console.log(boughtProducts);

    const fullOrderObject = {
      userId: userId,
      boughtProducts: boughtProducts,
      totalAmount: totalPrice,
    };

    // console.log(fullOrderObject);

    // send full object to DB side
    try {
      const serverResponse = await axios.post(
        "http://localhost:5555/orders",
        fullOrderObject
      );

      // log saved order
      console.log(serverResponse.data.message);

      // reset their ordered thing in the cart to not display them anymore

      // Navigate to MyOrder page upon success
      navigate("/order-confirm");
    } catch (error) {
      console.error("Error confirming order:", error);
      // Handle error, show message to the user
    }
  }

  // Handling the deletion of a cart item
  async function handleDeleteCartItem(itemCartId) {
    // console.log("clicked");
    // console.log(itemCartId);
    // console.log(userId);

    try {
      // Attempt to delete the item from the server
      // const serverResponse =
      await axios.delete(`http://localhost:5555/cart/${userId}/${itemCartId}`);

      // console.log(serverResponse.data.msg);

      // If successful, update the cart state
      const updatedCartItems = cartItems.filter(
        (item) => item._id !== itemCartId
      );

      // reset the cart items
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  }

  // the code to make my buttons work in adding and reducing quantities
  // Function to handle quantity change
  function handleCartQuantity(itemId, newQuantity) {
    // console.log(itemId);

    // Update the quantity in the state
    const updatedCartItems = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  }

  return (
      <div className="cart-container">
        <h1>Your Shopping Cart</h1> <hr/>

        {/* 
        aligning items in cart using js  
        but before check whether the cart has items
        */}

        {cartItems.length === 0 ? (
          <h5 className="empty-cart">Your cart is empty</h5>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={`${process.env.PUBLIC_URL}/img/${item.category}/${item.localFileName}`}
                  alt={item.name}
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: £{item.price.toFixed(2)}</p>

                  <div className="cart-item-quantity">
                    <p>Quantity:</p>

                    <div className="cart-quantity-controls">
                      <button
                        className=" btn btn-control btn-primary cart-control"
                        onClick={() => {
                          handleCartQuantity(item._id, item.quantity - 1);
                        }}
                        // a key word that can disable buttons in react takes on booleans
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <input
                        className="cart-quantity"
                        type="number"
                        id="quantity"
                        value={item.quantity}
                        readOnly
                      />

                      <button
                        className=" btn btn-control btn-primary cart-control"
                        onClick={() => {
                          handleCartQuantity(item._id, item.quantity + 1);
                        }}
                      >
                        +
                      </button>

                      {
                        // TOO MUCH WORRRRKKK
                        /* checking if some one has changed the original cart value that came with the cart 
                    {item.quantity === item.originalQuantity ? null : (
                      <button className="update-cart-button">
                        Update Cart
                      </button>
                    )}

                    */
                      }

                      <button
                        onClick={() => {
                          handleDeleteCartItem(item._id);
                        }}
                        className="delete-cart-item"
                      >
                        <img src={rubbishBin} alt="Delete item" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="cart-item-price">
                  £{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="total">Total: £ {totalPrice.toFixed(2)}</div>
          </div>
        )}

        {/* what button to show incase of empty cart */}
        {cartItems.length === 0 ? (
          <Link to="/" className="checkout-btn">
            Go to shop
          </Link>
        ) : (
          <button className="checkout-btn" onClick={handleCheckOut}>
            Proceed to Checkout
          </button>
        )}
      </div>
  );
}

export default Cart;
