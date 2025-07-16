import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"                           // used for hashing passwords for security

// SIGN UP LOGIC ----------------------------------------------------------------

async function userSignUpController(request, response) {
  // log the receive info from front
  // console.log(request.body);

  // we are going to try to add it to our database
  try {
    // we know what the body looks like you logged it
    // destructure it into your schema setting
    const { email, password, userName, postalCode, address } = request.body;

    // search through the DB for the username and see whther email and username are taken
    const existingUser = await userModel.findOne({
      $or: [{ email }, { userName }],
    });

    // handle the scenarios for what happens on searching user
    if (existingUser) {
      // Determine if the conflict is with the email or username
      if (existingUser.email === email) {
        // case of email being there already
        return response.status(400).json({ message: "Email already exists" });
      } else if (existingUser.userName === userName) {
        // case of username taken
        return response
          .status(400)
          .json({ message: "Username already exists" });
      }
    }

    // right before we create the user, we hash the password with bcrypt
    const hashedPassword = await bcrypt.hash( password, 12 ) 
    

    // if the algorithm manages to goe past check, only then can we add the user
    // Create a new user instance
    const newUser = new userModel({
      email,
      password : hashedPassword,
      userName,
      postalCode,
      address,
    });

    // save the user to the DB but we have to wait because the server could be busy
    await newUser.save();

    // then you can send the success
    response.status(200).json({ message: "User created sucessfully" });

    // the catch part is for if the server is down
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
}

// SIGN IN LOGIC ---------------------------------------------------------------------

async function userSignInController(request, response) {
  // log the receive info from front
  // console.log(request.body);

  // now are receive the body well we can manipulate it

  try {
    // destructure the inccoming data
    const { email, password } = request.body;

    // search through the DB for the email
    const existingUser = await userModel.findOne({ email });

    // console.log(existingUser);

    // check whether the user is in the database
    if (!existingUser) {
      return response
        .status(401)
        .json({ message: "Email doesnt exist!. Try again" });
    }

    // if it reaches here means the user is available hence we check the password

    // console.log(password, existingUser.password);


    // BEFORE WE DO ANYTHING WITH THE PASSWORD WE HAVE TO DECRYPT IT
    // we do that by comparing the decrypted and the original and log the boolean

    const matchingPassword = await bcrypt.compare(password,existingUser.password) 

    // console.log(matchingPassword);

    if (!matchingPassword) {
      return response
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    response.status(200).json({
      message: "sucessfully logged in",
      userdata: {
        userID: existingUser._id,
        username: existingUser.userName,
        postalCode: existingUser.postalCode,
        address: existingUser.address,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
}

async function userPasswordResetController(request, response){

  // console.log(request.body);
  const { email, newPassword } = request.body;

  // look for email in DB
  // Find the user by email
  const user = await userModel.findOne({ email });
  if (!user) {
    return response.status(404).json({ message: 'User not found' });
}

// console.log(user);
// hashing new password
 const hashedPassword = await bcrypt.hash(newPassword, 10);

 // Update user password
    user.password = hashedPassword;
    await user.save();

  response.status(201).json({message:"Sucess, Password Changed!"})

}

export { userSignUpController, userSignInController, userPasswordResetController };
