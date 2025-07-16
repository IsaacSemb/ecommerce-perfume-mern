import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import mongoose from "mongoose";
import { productModel } from "../models/productModel.js";

async function orderAddController(request, response) {
  // just making sure the object is correct
  try {
    // console.log(request.body);

    // Extracting data from the request body
    const { userId, boughtProducts, totalAmount } = request.body;

    // Validation to ensure required fields are present
    if (
      !userId ||
      !boughtProducts ||
      boughtProducts.length === 0 ||
      !totalAmount
    ) {
      return response.status(400).json({
        message: "Invalid input data. Please ensure all fields are provided.",
      });
    }

    // Creating a new order using the orderModel
    const savedOrder = new orderModel({
      userId,
      boughtProducts,
      totalAmount,
    });

    // save these to the DB
    await savedOrder.save();

    // console.log(savedOrder);

    // AFTER YOU CAN DELETE THEM FROM THE CART

    // Updating the cart items to set `ordered` to `true`
    const productIds = boughtProducts.map((product) => product.productId); // Get all product IDs in the order --- RETURNS A LIST OF THE PROD IDS

    await cartModel.updateMany(
      { userId, productId: { $in: productIds }, ordered: false }, // Find cart items that match the user and products in the order and are not yet ordered
      { $set: { ordered: true } } // Set the ordered field to true
    );

    // Sending a success response with the saved order data
    response.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });

    // response.send(200).json({message:"DONE"})
  } catch (error) {
    // Handling any errors that occur during the process
    console.error("Error adding order:", error);
    response.status(500).json({
      message:
        "An error occurred while placing the order. Please try again later.",
      error: error.message,
    });
  }
}

async function retrieveOrdersController(request, response) {

  try {
    // Extract userId from request query parameters or request parameters
    
    const userId = new mongoose.Types.ObjectId(request.params.userId);
    
    if (!userId) {
      return response.status(400).json({ message: 'User ID is required' });
    }

    // Query the database for orders by the userId
    const orders = await orderModel.find({ userId }).exec();

    // Send a successful response with the orders
    response.status(200).json({ orders });





  } catch (error) {
    console.log(error);
  }
}

export { orderAddController, retrieveOrdersController };
