import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
        <div className="footer-container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center">
        <p className="col-md-4 mb-0 text-body-secondary">
            &copy; 2024
            Semb
            <img className="logo" src={`${process.env.PUBLIC_URL}/img/logo/logo-trsp.png`} alt="company logo" />
            Fragrances
        </p>
       
        <ul className="nav col-md-4 justify-content-end">
            <li key="home" className="nav-item"><Link to="/" className="nav-link  text-body-secondary">Home</Link></li>
            <li key="contact-us" className="nav-item"><Link to="/contact-us" className="nav-link  text-body-secondary">Contact Us</Link>
            </li>
            <li key="about" className="nav-item"><Link to="/about-us" className="nav-link  text-body-secondary">About</Link></li>
        </ul>
    </footer>
</div>
    </div>
  )
}

export default Footer