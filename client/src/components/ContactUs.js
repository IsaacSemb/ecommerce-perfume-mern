import React from "react";

function ContactUs() {
  return (
    <section className="contact-page">
      <div className="contact-intro-section">
        <div className="contact-intro">
          <h2>Contact Us</h2>
          <p>Have questions or feedback? We'd love to hear from you!</p>
        </div>
      </div>

      <div className="contact-cards">
        <div className="store-info">
          <h2>Find Us</h2>
          <p>
            <strong>Address:</strong> <br /> 610 Mukono, Nasuuti
            <br /> B4 7XJ
          </p>
          <p>
            {" "}
            <strong> Telephone: </strong> <br /> +256 784 434 407{" "}
          </p>
          <p>
            <strong>Email:</strong> info@sembfragrances.com
          </p>
        </div>

        <form method="POST">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">What is on Your mind?</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

      <div className="socials">
        <p>Feel free to give us a follow on all our social media accounts</p>

        <div className="social-icon">
          <a href="https://www.facebook.com/ikesemb96/">
            <img
              src={`${process.env.PUBLIC_URL}/img/socials/facebook.png`}
              alt="facebook"
            />
            <span> Facebook </span>
          </a>

          <a href="https://www.instagram.com/ikesemb96/   ">
            <img
              src={`${process.env.PUBLIC_URL}/img/socials/instagram.png`}
              alt="instragram"
            />
            <span> Instagram </span>
          </a>

          <a href="https://x.com/IkeSemb">
            <img
              src={`${process.env.PUBLIC_URL}/img/socials/twitter.png`}
              alt="twitter"
            />
            <span> Twitter </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
