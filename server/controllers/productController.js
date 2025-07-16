// this file is a router for the product ( hence we need the product model )
import { categoryModel } from "../models/categoryModel.js";
import { productModel } from "../models/productModel.js";



// --------------- ---------------------------------   pulling categories


//call back function ( things to do with DB calls are asynchronous )
async function categoryAllFetchingController(request, response) {
  //to avoid any problems, we embed a try catch block in the funtion to handle any errors
  try {
    // try to find the products and send them to the client side
    const categories = await categoryModel.find({});

    
    // console.log(request.body); // logs nothing
    // console.log(categories);

    // send the products back to the client screen
    return response.status(200).json( { data : categories } );
  } catch (error) {
    // log it for the devs
    console.log(error.message);

    //log it for the user
    response.status(500).send({
      message: "Error, product cant be found, sorry!",
    });
  }
}




// -------------------pulling products ---------------------------------------------

// call back but its for a db hence asynchronous
async function productAllFetchingController(request, response) {
  try {
    // try to find the products and send them to the client side
    const products = await productModel.find({});

    // console.log(request.body); // logs nothing
    // console.log(products);

    // send the products back to the client screen
    return response.status(200).json(
      {
        count: products.length, // send the number of our products
        products: products,
      } // and the products themselves
    );
  } catch (error) {
    // log it for the devs
    console.log(error.message);

    //log it for the user
    response.status(500).send({
      message: "Error, product cant be found, sorry!",
    });
  }
}

//-----------------------------------------------------------------

// call back but its for a db hence asynchronous
async function productIDfetchingController(request, response) {
  try {
    // destructure it from request parameters

    const { id } = request.params;

    // finding that one product by id
    const product = await productModel.findById(id);

    // send the product back to the client screen
    return response.status(200).json(product); // return product to client
  } catch (error) {
    // log it for the devs
    console.log(error.message);

    //log it for the user
    response.status(500).send({
      message: "Error, product cant be found, sorry!",
    });
  }
}

export {
  productAllFetchingController,
  productIDfetchingController,
  categoryAllFetchingController,
};
