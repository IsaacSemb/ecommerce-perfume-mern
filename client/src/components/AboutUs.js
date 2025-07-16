import React from "react";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="text-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/logo/logo-trsp.png`}
            alt="company-logo"
          />
          <h1 className="display-5 fw-bold text-body-emphasis">Our Mantra</h1>

          <p className="lead">
            Welcome to Semb Fragrances Ltd, your go-to for premium perfumes and
            fragrances. We offer a curated selection of top-quality scents at
            affordable prices. Trust us to provide a seamless, delightful
            shopping experience for your perfect fragrance.
          </p>
          <Link to={"/"}>
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
              Check Us Out
            </button>
          </Link>
        </div>
      </section>

      <section className="our-features">
        <h2 className="feature-title">What Are We About?</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3 mx-2">
          <div className="feature col">
            <div className="feature-and-icon border-bottom trust-feature">
              <img
                src={`${process.env.PUBLIC_URL}/img/icons/trustworthy.png`}
                alt=""
              />
              <h3 className="fs-2 text-body-emphasis">Trust Worthy</h3>
            </div>
            <p className="lead">
              At Semb Fragrances, trust is our foundation. We ensure
              transparency, secure transactions, and genuine products.
            </p>
          </div>

          <div className="feature col">
            <div className="feature-and-icon border-bottom price-feature">
              <img
                src={`${process.env.PUBLIC_URL}/img/icons/cheap_item.png`}
                alt=""
              />
              <h3 className="fs-2 text-body-emphasis">Price Friendly</h3>
            </div>

            <p className="lead">
              We believe luxury should be accessible. Our competitive pricing
              ensures you get the finest perfumes and fragrances without
              breaking the bank.
            </p>
          </div>

          <div className="feature col">
            <div className="feature-and-icon border-bottom quality-feature">
              <img
                src={`${process.env.PUBLIC_URL}/img/icons/quality.png`}
                alt=""
              />
              <h3 className="fs-2 text-body-emphasis">Quality</h3>
            </div>

            <p className="lead">
              Quality is our priority. We meticulously select and offer only the
              finest perfumes and fragrances.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
