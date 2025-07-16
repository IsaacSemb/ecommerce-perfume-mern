import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {
  // to help us navigate back to the home page incase of cancel
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };

  // state for the userName
  const [userName, setUserName] = useState();

  // state for the email
  const [email, setEmail] = useState();

  // state for the password
  const [password, setPassword] = useState();

  // state for confirmed password
  const [confirmedPassword, setConfirmedPassword] = useState();

  //state for postalCode
  const [postalCode, setPostalCode] = useState();

  //state for address
  const [address, setAddress] = useState();

  // what to do on sumbitting

  async function handleSubmit(e) {

    e.preventDefault();

    // just me checking to see
    console.log(userName, email, password, confirmedPassword, postalCode, address );
    
    // checking password match
    if (password !== confirmedPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {


      // try to use axios to send to server
      const serverResponse = await axios.post(
          "http://localhost:5555/signup",
          { email, password, userName, postalCode, address }
      )


      // answer on sucess
      if (serverResponse.status === 201 || serverResponse.status === 200 ){

        alert("user created succesfully")
        console.log(serverResponse.status)
        navigate("/login")
      
      } else{   

        // Handle unexpected status codes
        alert(`Unexpected response status: ${serverResponse.status}`);
        console.log(`Unexpected response status: ${serverResponse.status}`);

      }


    } catch(error){

        // Handle errors and log detailed information
      if (error.response) {

        alert(`Error: ${error.response.data.message || "Error creating user"}`);
        console.log("Error response data:", error.response.data);

      } else if (error.request) {

        // The request was made but no response was received
        alert("No response received from the server");
        console.log("Error request:", error.request);

      } else {

        // Something happened in setting up the request that triggered an Error
        alert("Error setting up request");
        console.log("Error message:", error.message);

      }
    }
  }


   

  return (
    <div className="login-modal">
      <div className="login-card">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit} method="POST">
          <div className="login-input">
            <label>UserName:</label>

            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="login-input">
            <label>Email:</label>

            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input">
            <label>Password:</label>

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-input">
            <label>Confirm Password:</label>

            <input
              type="password"
              onChange={(e) => setConfirmedPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-input">
            <label>PostalCode:</label>

            <input
              type="text"
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          <div className="login-input">
            <label>Address:</label>

            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit">Sign Up</button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          <Link to={"/login"}>
            <p>Already have an account? Login</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
