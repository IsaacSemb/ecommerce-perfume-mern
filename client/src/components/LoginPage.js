import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthenticationNecessities } from "./AuthenticationContext";

function LoginPage() {
  // to redirect user anywhere
  const navigate = useNavigate();

  // when user doesnt  want to login
  const handleCancel = () => {
    navigate("/");
  };

  // CAPTURE THE STATES FOR IMPORTANT DATA ( you can do them in one object but i chose to separate them)
  // state for the email
  const [email, setEmail] = useState();

  // state for the password
  const [password, setPassword] = useState();

  // state for the LOGGED IN STATE --- Manual method remove later
  // const [loggedIn, setLoggedIn] = useState(false);

  // get the login function that helps you login from the authenticationpack
  const { login } = useAuthenticationNecessities();

  // what to do on sumbitting

  async function handleSubmit(e) {
    e.preventDefault();

    // just me checking to see
    // console.log(email, password);

    // START TRYING TO RECONCILE WITH THE DATABASE
    try {
      // try to use axios to send to server
      const serverResponse = await axios.post("http://localhost:5555/login", {
        email,
        password,
      });

      // answer on sucess
      if (serverResponse.status === 201 || serverResponse.status === 200) {
        // in case of success change the logged in status
        // setLoggedIn(true);

        // status of the request
        // console.log(serverResponse.status);

        // the object sent back
        /* 
        its structure
        {
        userID,
        username,
        postalCode,
        address       
        }
        */
        // console.log(serverResponse.data.userdata);

        const USER_DETAILS = serverResponse.data.userdata;

        // console.log(USER_DETAILS.userID);
        // console.log(USER_DETAILS.username);
        // console.log(USER_DETAILS.postalCode);
        // console.log(USER_DETAILS.address);

        // the login we created needs the userID
        // it keeps it ine the session storage
        login(USER_DETAILS.userID, USER_DETAILS.username);

        // just me seeing whther they work
        // console.log(sessionStorage);
        // console.log(sessionStorage.getItem("userId"));
        // console.log(sessionStorage.getItem("username"));

        // after that send the user back to the homepage
        alert(`${serverResponse.data.message}`); // REMOVE THIS LATER

        // send them back to homepage
        navigate("/");
      } else {
        // Handle unexpected status codes
        alert(`Something went wrong login failed`);
        console.log(`Unexpected response status: ${serverResponse.status}`);
      }
    } catch (error) {
      // Handle errors and log detailed information
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Error logging in"}`);
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
        <h2>Login</h2>

        <form onSubmit={handleSubmit} method="POST">
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

          <div className="button-group">
            <button type="submit">Login</button>

            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          <Link to={"/signup"}>
            <p>Dont have an account? Sign Up</p>
          </Link>

          <Link to={"/reset-password"}>
            <p>Forgot Password? Click here to reset</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
