import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SingleProduct(props) {
  // we use the page we came from to come here it comes with the details
  const data = useLocation().state;

  // intialize navigate
  const navigate = useNavigate();

  // i logged it to see how it looks like
  // console.log(data);

  // settting up the quantity value
  const [itemQuantity, setItemQuantity] = useState(1);

  // the code to make my buttons work in adding and reducing quantities
  function changeQuantity(event) {
    // console.log(event.target.innerHTML);
    // console.log(event.target.nextSibling.value);
    // console.log(event.target.previousSibling.value);

    // check button whether + or -
    if (event.target.innerHTML === "-") {
      // if tthe quantity is one we just return 1 since it is the lowest we can go
      if (itemQuantity === 1) {
        return setItemQuantity(1);
      } else {
        // else if it is more than one, wwe can reduce it by one
        setItemQuantity(itemQuantity - 1);
      }
    } else if (event.target.innerHTML === "+") {
      // if press + increment the quantity by 1
      setItemQuantity(itemQuantity + 1);
    }
  }

  // what happens when we press add to cart

  async function handleAddToCart() {
    // log it for proof
    // console.log("add to cart");

    // check for login and if not logged in ... send them away.............
    // start by asking the window for userid from sessionstorage

    const userId = sessionStorage.getItem("userId");

    // check if its there / null = false
    if (!userId) {
      // converted to bool for false
      // send them a message
      alert("Please login to add item to Cart!");

      // send them back to home -- NEVER TO SEE THE CART EVER HAHAHAHAHA
      navigate("/");
      return;
    }

    try {
      const productObjectforServer = {
        userId,
        itemId: data.id,
        qty: itemQuantity,
      };
      // console.log(productObjectforServer);

      // try to send that item to cart in DB for storage
      await axios.post(
        // wait for axios to send before doing anything else
        "http://localhost:5555/cart",
        productObjectforServer
      );

      // alert them that added well and send them home
      alert("Item Added to Cart!");
      navigate("/");
    } catch (error) {
      // if any thing goes wrong with sending item to DB
      console.error("Error adding item to cart");

      // also tell the user too
      alert("Failed to add item to cart.");
    }
  }

  return (
    <div>
      <section className="single-product">
        <div className="card-img-container">
          <img
            className="prod-image"
            src={`${process.env.PUBLIC_URL}/img/${data.category}/${data.localFileName}`}
            alt="perfume"
          />
        </div>

        <div className="pdt-details">
          <h3 className="product-name">{data.name}</h3>

          <p>{data.description}</p>

          <div className="price">
            <h3>
              Price: £<span id="price-per-piece">{data.price.toFixed(2)}</span>
            </h3>
          </div>

          <div className="add-to-cart">
            <div className="quantity-selector">
              <label htmlFor="quantity" className="quantity-label">
                Quantity:
              </label>

              <button
                className=" btn btn-control btn-primary"
                onClick={changeQuantity}
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                placeholder="1"
                value={itemQuantity}
                readOnly
              />
              <button
                className=" btn btn-control btn-primary"
                onClick={changeQuantity}
              >
                +
              </button>
            </div>

            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SingleProduct;
