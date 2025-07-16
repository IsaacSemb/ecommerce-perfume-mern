
// our ORM for creating database schemas 
import mongoose from "mongoose";

// schema for our perfume products
const categorySchema = mongoose.Schema(
    // an object with details
    {
        categoryName:{ type:String, required:true },
        categoryDescription:{ type:String, required:true },
        category:{ type:String, required:true },
        localFileName:{ type:String, required:true }        
    }
)

export const categoryModel = mongoose.model( "Category", categorySchema )


