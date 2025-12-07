import React, { useState } from "react";
import { myAxios } from "../services/admin-helper"; 
import "../styles/App.css";
import Swal from 'sweetalert2'

function ContactForm() {
    
    // Use state to capture form data
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        mobile: "",
        subject: "",
        message: ""
    });

    // Handle input change and update the form data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {

        e.preventDefault();

        if (formData.fullname === '' || formData.email === '' || formData.message === ''
            || formData.subject === '' || formData.mobile === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                text: 'Please fill all the information.',
                confirmButtonText: 'OK'
            });
        }

        else{

            const contactData = {
                name: formData.fullname,
                contactEmail: formData.email,
                contactMobile: formData.mobile,
                contactSubject: formData.subject,
                contactMessage: formData.message
            };

            // Post form data to backend
            // axios.post("http://localhost:8030/contact/save-contact", contactData)
            myAxios.post("/public/contact/save", contactData)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your message has been submitted successfully.',
                    confirmButtonText: 'OK'
                });
                // clear the form or show a success message
                setFormData({ fullname: "", email: "", subject: "", message: "" });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something went wrong.',
                    confirmButtonText: 'OK'
                });
                console.error("Error saving contact message:", error);
            });
        };
    }

    return (
        <>
            <div className="">
                <div className="col-md-12">
                    <div className="card contact-form p-4 mb-2">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="firstname"
                                    name="fullname"
                                    className="form-input contact-form-input"
                                    placeholder="Enter Your Name Here"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input contact-form-input"
                                    placeholder="Enter Your Email Here"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="text"
                                    name="mobile"
                                    className="form-input contact-form-input"
                                    placeholder="Enter Your Mobile Here"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-input contact-form-input"
                                    placeholder="Enter Subject Here"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    id="message"
                                    name="message"
                                    className="contact-textarea contact-form-input"
                                    rows="4"
                                    placeholder="Enter Your Message Here"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <button type="submit" className="contact-form-btn text-dark">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactForm;
