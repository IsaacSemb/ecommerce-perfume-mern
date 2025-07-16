// for setting up the server
import express from "express";

// for parsing json files to server
import bodyParser from "body-parser";

//for connecting to the mongo db
import mongoose from "mongoose";

// our important variables and other stuff
import { MONGOURL, PORT } from "./customConfigurations.js";

// cors for cross origin resource sharing for sharing with react server
import cors from "cors";

// IMPORT CONTROLLERS OR LOGIC FOR THE ROUTES TAKEN
import { userSignUpController, userSignInController, userPasswordResetController } from "./controllers/userController.js";
import { addToCartController, retrieveCartController, removeItemOnCartController } from "./controllers/cartController.js";
import { productAllFetchingController, categoryAllFetchingController } from "./controllers/productController.js"
import {orderAddController, retrieveOrdersController } from "./controllers/ordersController.js";



// testing my external variables
// console.log(PORT);
// console.log(MONGOURL);

// creating express app from express module-----------------------------------------------
const app = express();

// --------------------- ANY AND ALL MIDDLE WARE --------------------

// applying the body pasrser middle ware to work the json files----------------------------------
app.use(
  // using the body parser middleware
  bodyParser.json()
);

//CORS POLICY HANDLING  ----------------------------------------------------------------------------
// app.use(cors());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the origin of your frontend
    methods: ["GET", "POST", "DELETE", "PUT"], // Specify the methods you allow
  })
);

// ------------------- MIDDLE WARE ENDS HERE ------------------

// connect to the database --- Connect to MongoDB -----------------------------------------
mongoose
  .connect(
    // url to our db (mongodb URL)
    MONGOURL,
    {
      useNewUrlParser: true, // depracated
      useUnifiedTopology: true, // depracated
    }
  )
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
  });

// homepage route -----------------------------------------------------------------------
app.get(
  //route name
  "/",

  // call back on what happens
  function (request, response) {
    response.send("<h1>BACKEND SERVER FOR PERFUMES SHOP</h1>");
  }
);


// --------------------------------------------------------------------------------- USER OPERATIONS
// NEW USER SIGNING UP ---------------------------------------
app.post("/signup", userSignUpController);

// USER LOGGING IN
app.post("/Login", userSignInController)

// reset passord
app.post("/passwordreset", userPasswordResetController)


// ------------------------------------------------------------------------------ PRODUCTS OPERATIONS


// getting categories
app.get("/categories", categoryAllFetchingController );


// getting all products from the db
app.get("/products", productAllFetchingController );





// ------------------------------------------------------------------------------ CART OPERATIONS
// some one sending item to their cart
app.post('/cart', addToCartController );

// retrieving the cart
app.get('/cart/:userId', retrieveCartController );

// someone removes items from their cart  
app.delete('/cart/:userId/:cartId', removeItemOnCartController );


// ------------------------------------------------------------------------------ ORDER OPERATIONS
app.post( '/orders' , orderAddController)
app.get( '/orders/:userId' , retrieveOrdersController)



// starting the server -------------------------------------------------------------------
app.listen(
  PORT, // port to listen at

  //call back function on what to do
  function () {
    console.log(`Listening on port ${PORT}`);
  }
);
