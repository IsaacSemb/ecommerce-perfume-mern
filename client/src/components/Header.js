import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";

// import the authentication provider since we need the login state
import { useAuthenticationNecessities } from "./AuthenticationContext";

function Header() {
  // get the global variables for authentication
  const { authenticationState, logout } = useAuthenticationNecessities();

  //use navigator
  const navigate = useNavigate();

  // testing authentionvalues
  // console.log(authenticationState);

  function handleCartClick(event) {
    if (!authenticationState) {
      event.preventDefault(); // Prevent the default link behavior
      alert("You need to log in to see your cart!");
      navigate("/login");
    }
  }

  function handleLogoutClick(event) {
    event.preventDefault(); // Prevent the default link behavior
    logout(); // Call the logout function
    navigate("/"); // Redirect to the home page or login page after logout
  }

  return (
    <header className="header-section">
      <div className="brand-title">
        <div className="brand">
          <h1 className="brand-words">Semb</h1>
          <img
            className="logo"
            src={`${process.env.PUBLIC_URL}/img/logo/logo-trsp.png`}
            alt="company
      logo"
          />
          <h1 className="brand-words">Fragrances</h1>
        </div>

        {/* <div className="slogan">Find Your Signature Scent</div> */}
      </div>

      <div className="nav-icons">
        <Link
          className="cart-icon1"
          to={authenticationState ? "/cart" : "/"}
          onClick={handleCartClick}
        >
          <img
            className="cart-icon"
            src={`${process.env.PUBLIC_URL}/img/icons/shopping cart.png`}
            alt="shop icon"
          />
          <div className="login-logout">Cart</div>
        </Link>

        <Link to={authenticationState ? "/" : "/login"}>
          <div className="user-icon">
            <img
              src={`${process.env.PUBLIC_URL}/img/icons/user_icon.png`}
              alt="user icon"
            />

            <div className="login-logout">
              {authenticationState
                ? `Hello, ${sessionStorage.getItem("username")}`
                : "Login"}
            </div>
          </div>
        </Link>

        <div className="nav-dropdown">
          <div className="nav-item dropdown">
            <Dropdown>
              <Dropdown.Toggle
                className="custom-dropdown-toggle"
                variant="primary"
                id="dropdown-basic"
              >
                &#9776;
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/">
                  Home
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/contact">
                  Contact
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/about-us">
                  About
                </Dropdown.Item>

                {authenticationState ? (
                  <Dropdown.Item as={Link} to="/order-history">
                    Orders
                  </Dropdown.Item>
                ) : null}

                {authenticationState ? (
                  <Dropdown.Item as={Link} onClick={handleLogoutClick}>
                    Log Out
                  </Dropdown.Item>
                ) : null}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <nav className="nav-links">
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/contact-us">Contact</Link>
          <Link to="/about-us">About</Link>

          {!authenticationState ? null : (
            <Link to={'/order-history'}>
              {authenticationState ? "Orders" : null}
            </Link>
          )}


          {!authenticationState ? null : (
            <Link onClick={handleLogoutClick}>
              {authenticationState ? "LogOut" : null}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
