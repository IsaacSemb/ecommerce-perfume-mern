//
import React from "react";

// css for App div

// import all your components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import Perfumes from "./components/Perfumes";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import SingleProduct from "./components/SingleProduct";
import SignUpPage from "./components/SignUp";
import Cart from "./components/Cart";
import Orders from "./components/OrdersConfirm";
import OrderLog from "./components/OrderLog";
import OrderDetails from "./components/OrderDetails";
import ForgotPassword from "./components/ForgotPassword";

// quality of life to scroll pages to the top
import ScrollToTop from "./components/ScrollToTop";

// react router dom necessities
import {
  Route, //  a single route to a component created
  BrowserRouter, // the whole browser router that moves btn the pages
  Routes, // engulfs all the routes that have the route tag
} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="app-container">
          <ScrollToTop />
          <Header />

          {/* Main content area where different routes will be rendered */}
          <main className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/perfumes" element={<Perfumes />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/single-product" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-confirm" element={<Orders />} />
              <Route path="/order-history" element={<OrderLog />} />
              <Route path="/order-details" element={<OrderDetails />} />
              <Route path="/reset-password" element={<ForgotPassword />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
