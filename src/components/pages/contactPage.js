import React, { useState } from "react";
import Banner from "../banner.js";
import axios from "axios";

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    to: "ijd.irving@gmail.com",
    url: window.location.hostname,
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  console.log(contactForm);
  const onChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const send = (e) => {
    e.preventDefault();
    if (
      contactForm.name == "" ||
      contactForm.email == "" ||
      contactForm.subject == "" ||
      contactForm.message == ""
    ) {
      window.scrollTo(0, 0);
      setError(true);
    } else {
      axios
        .post(
          `https://fixmylife-next-api.herokuapp.com/api/mailer/`,
          contactForm
        )
        .then(
          (response) => {
            window.scrollTo(0, 0);
            setEmailSent(true);
            console.log("SUCCESS!", response);
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
    }
  };

  return (
    <div>
      <Banner title="Contact" />
      <div className="cartContainer">
        {emailSent ? (
          <p className="emptyCartText">Your message was sent.</p>
        ) : (
          <form onSubmit={send} className="contactForm">
            {!error ? (
              ""
            ) : (
              <div className="contactAlertMessage">
                <h5>ALL FIELDS ARE REQUIRED</h5>
              </div>
            )}

            <div className="contactformInputLine">
              <p>Name</p>
              <input name="name" onChange={onChange} />
            </div>
            <div className="contactformInputLine">
              <p>Email</p>
              <input name="email" onChange={onChange} />
            </div>
            <div className="contactformInputLine">
              <p>SUBJECT</p>
              <input name="subject" onChange={onChange} />
            </div>
            <div className="contactformInputLine">
              <p>MESSAGE</p>
              <textarea name="message" onChange={onChange} />
            </div>
            <button className="formButton">SEND MESSAGE</button>
          </form>
        )}
      </div>
      {/* <button onClick={send}></button> */}
    </div>
  );
}
