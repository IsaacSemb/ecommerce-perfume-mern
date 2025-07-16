
// our ORM for creating database schemas 
import mongoose from "mongoose";

// schema for our perfume products
const productSchema = mongoose.Schema(
    // an object with details
    {
        productName:{ type:String, required:true },
        price:{ type:Number, required:true },
        description:{ type:String, required:true },
        category:{ type:String, required:true },
        localFileName:{ type:String, required:true }        
    }
)

export const productModel = mongoose.model( "Product", productSchema )


