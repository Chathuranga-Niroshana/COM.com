import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any questions or concerns, feel free to contact us.</p>
      <div className="contact-details">
        <div className="contact-info">
          <h3>Address</h3>
          <p>123 Kandy Road,</p>
          <p>Colombo, Sri Lanka</p>
        </div>
        <div className="contact-info">
          <h3>Email</h3>
          <p>abcd@gmail.com</p>
        </div>
        <div className="contact-info">
          <h3>Phone</h3>
          <p>+94 123 456 789</p>
        </div>
      </div>
      <div className="contact-form">
        <h3>Send us a message</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" placeholder="Your message"></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
