import mongoose from "mongoose";
import cartModel from "../models/cartModel.js";

//  LOGIC TO WHEN SOME ONE ADDS ITEM TO THEIR CART
async function addToCartController(request, response) {
  // log the receive info from front
  // console.log(request.body);

  // destructure the incoming request body
  const { userId, itemId, qty } = request.body;

  /*   summrize object in model 
    {
      userId
      productId
      quantity
      ordered   ---- IS BY DEFAULT FALSE
    }
*/

  // try to create DB item and send it to DB

  try {
    // check if item in cart already so that then  i can just add to its quantity

    let cartItem = await cartModel.findOne({
      userId: userId,
      productId: itemId,
      ordered: false,
    });

    if (cartItem) {
      // if item is in cart --- add its quantity by  the amount the user put in front end
      cartItem.quantity += qty;

      // save it to the db
      await cartItem.save();

      // send update secretly for future dev hahahahaha
      response.status(200).json({
        message: "cart update has happened",
      });
    } else {
      // carry on noramlly and create new cart item

      const cartItem = new cartModel({
        // cartmodel will model this object
        userId: userId,
        productId: itemId,
        quantity: qty,
        // ordered,     you can leave it out since it is by default false
      });

      // save it to DB but wait for it with await
      const result = await cartItem.save();

      // send back response
      const responseObject = {
        cartId: result._id,
        message: "Item added to cart",
      };
      response.status(201).json(responseObject);
    }

    // console.log(result);
  } catch (error) {
    // log server error for dev
    console.log(error);

    // log for user and send it back
    response.status(500).json({ message: "Error adding to cart" });
  }
}

async function retrieveCartController(request, response) {
  // first convert the incoming id to a mongo schema id object
  // for easier manipulation

  const userId = new mongoose.Types.ObjectId(request.params.userId);

  // try to reach out to the DB and get the cart items

  try {
    // START

    // give the cart Model some very important instructions
    // ( just by how spaghetti they look makes them look important )

    const cartItems = await cartModel.aggregate([
      {
        // instruction 1: TO MATCH IDS IN THE CARTS TABLE THAT ARE NOT ORDERED
        $match: {
          // match cart items that havent been ordered (false)
          userId: userId,
          ordered: false,
        },
      },

      // INSTRUCTION 2 : look up products that match the products in the cart
      {
        // remember this is a cart Model aggregate
        $lookup: {
          from: "products", // the cart looks into the products
          localField: "productId", // field from the carts -- that it shares with products
          foreignField: "_id", // whats that field called in products
          as: "productDetails", //
        },
      },

      // instruction 3 unwind the products
      { $unwind: "$productDetails" },

      // instruction 4 : display the products
      {
        $project: {
          _id: 1,
          userId: 1,
          productId: 1,
          quantity: 1,
          ordered: 1,
          name: "$productDetails.name",
          price: "$productDetails.price",
          category: "$productDetails.category",
          localFileName: "$productDetails.localFileName",
        },
      },
    ]);

    // after fetching, log them and we see
    // console.log(cartItems);

    // check if the cart has some items (this seems risky)-----------
    // if (!cartItems.length) {
    //   return res.status(404).json({ message: 'No items in your cart' });
    // }

    // SEND THE ITEMS BACK TO THE FRONT END
    response.status(200).json(cartItems);

    //END of TRY
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "Error retrieving cart items", error: error.message });
  }

  // End Async
}

async function removeItemOnCartController(request, response) {
  const { userId, cartId } = request.params;

  // console.log(userId,"##",cartId);

  try {
    // check the sent details
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(cartId)
    ) {
      return res.status(400).json({ message: "Invalid userId or productId." });
    }

    // Find the cart item by cartId and delete it
    const cartItem = await cartModel.findByIdAndDelete(cartId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    response.status(200).json({ message: "Cart Item Deleted" });
  } catch (error) {
    console.log(error);
  }
}

export {
  addToCartController,
  retrieveCartController,
  removeItemOnCartController,
};
