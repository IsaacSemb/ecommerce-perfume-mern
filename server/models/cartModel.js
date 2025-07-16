import mongoose from "mongoose";

// A schema of how the cart will look

/* 

i think it needs
    user id of account that put it
    and the object id i think

    THOSE TWO CAN BE REVERSE SEARCHED AND WE GET THEIR DETAILS  --- lol i was wrong

 */

// cart schema

const cartSchema = mongoose.Schema(
  // object with how properties look
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    ordered: {
      type: Boolean,
      required: true,
      default: false,
    },
  }
);

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
