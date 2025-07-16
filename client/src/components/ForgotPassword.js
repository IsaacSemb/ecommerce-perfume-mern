import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ForgotPassword() {
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
  const [newPassword, setNewPassword] = useState();

  // state for passord confirm
  const [ confirmNewPassword , setConfirmNewPassword]  = useState();

  // what to do on sumbitting

  async function handleSubmit(e) {
    e.preventDefault();


    if(newPassword!==confirmNewPassword){
      alert("Passwords dont match")
      return
    }

    
    // START TRYING TO RECONCILE WITH THE DATABASE
    try {
      // try to use axios to send to server
      const serverResponse = await axios.post("http://localhost:5555/passwordreset", {
        email,
        newPassword,
      });

      console.log(serverResponse.data.message);
      
      // answer on sucess
      if (serverResponse.status === 201 || serverResponse.status === 200) {
  
        alert(serverResponse.data.message)
        // send them back to Login
        navigate("/login");
      } else {
        // Handle unexpected status codes
        alert(`Something went wrong login failed`);
        console.log(`Unexpected response status: ${serverResponse.status}`);
      }
    } catch (error) {
      // Handle errors and log detailed information
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Error updating password"}`);
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
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-input">
            <label>Confirm Password:</label>

            <input
              type="password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit">Reset Password</button>

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
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
