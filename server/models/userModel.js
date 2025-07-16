// our ORM for creating database schemas
import mongoose from "mongoose";

// schema for our users who make accounts with us
const userSchema = mongoose.Schema(
  // an object with details
  {
    email: {
      type: String,
      required: true,
      unique:true // cant have 2 similar emails
    },

    password: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
      unique:true
    },
    postalCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  }
);

const userModel = mongoose.model("User", userSchema);
export default userModel