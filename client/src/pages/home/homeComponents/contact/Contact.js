import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const form = useRef();
  const [formStatus, setFormStatus] = useState(null); // State for success/error messages

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus(null); // Reset status before sending

    emailjs
      .sendForm('service_ivmt9ik', 'template_8gm5ava', form.current, {
        publicKey: 'vdpwya80aNuLFsXGx',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setFormStatus({ type: 'success', message: 'Message sent successfully!' });
          form.current.reset(); // Clear form after success
        },
        (error) => {
          console.log('FAILED...', error.text);
          setFormStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        }
      );
  };

  return (
    <section className="contact position-relative" style={{ minHeight: '100vh' }}>
      <div className="container">
        <h1 className="contact-text" id="contact-section">
          Contact Us
        </h1>
        <div className="row contact-container">
          <div className="col-lg-6">
            <div className="contact-details">
              <span className="heading-paragraph">
                <h1 className="heading-contact">Let's Talk</h1>
                <p className="paragraph-contact">
                  Have a question or want to connect? Drop us a message using
                  the form below. We're here to help skilled workers and
                  investors find the right opportunities. Our team will get back
                  to you soon. Thanks for reaching out!
                </p>
              </span>
              <span className="contact-secondary">
                <h2>Email</h2>
                <p>ezhu@gmail.com</p>
              </span>
              <span className="contact-secondary">
                <h2>Number</h2>
                <p>0762015196</p>
              </span>
              <span className="contact-secondary">
                <h2>Address</h2>
                <p>Vavuniya, Sri Lanka</p>
              </span>
            </div>
          </div>
          <div className="col-lg-6">
            <form
              id="contactForm"
              className="contact-form"
              ref={form}
              onSubmit={sendEmail}
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input className="inputType" name="from_name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  className="inputType"
                  type="email"
                  name="from_email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="form-control textArea"
                  rows="5"
                  name="message"
                  required
                  style={{ width: "580px" }} // Fixed syntax
                ></textarea>
              </div>
              <div>
                <Button
                  className="homepage-submit-Button"
                  name="Submit"
                  type="submit"
                />
              </div>
              {formStatus && (
                <div
                  className={`mt-3 text-center ${
                    formStatus.type === 'success' ? 'text-success' : 'text-danger'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;