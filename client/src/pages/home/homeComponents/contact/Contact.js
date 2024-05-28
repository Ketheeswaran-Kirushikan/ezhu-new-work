import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../../../../components/input/Input';
import './Contact.css';
import Button from '../../../../components/button/Button';


const Contact = () => {
    return (
        <section className='contact' >
            <div className="container ">
            <h1 className="contact-text" id='contact-section'>Contact Us</h1>
                <div className="row contact-container">
                    <div className="col-lg-6">
                        <div className="contact-details">
                            <span className='heading-paragraph'><h1 className='heading-contact'>Let's Talk</h1>
                            <p className='paragraph-contact'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius morbi enim nunc faucibus. Non consectetur a erat nam at.</p></span>
                            <span className='contact-secondary'> <h2>Email</h2>
                            <p>ezhu@gmail.com</p></span>
                            <span className='contact-secondary'> <h2>Number</h2>
                            <p>0762015196</p></span>
                            <span className='contact-secondary'> <h2>Address</h2>
                            <p>vavuniya, Srilanka.</p></span>
                            
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <form id="contactForm" className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Input className="inputType"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input className="inputType"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" className="form-control textArea" rows="5" required></textarea>
                            </div>
                            <div>
                                <Button className="homepage-submit-Button" name="Submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Contact