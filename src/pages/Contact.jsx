
import { useEffect, useState } from "react";
import "../styles/App.css";
import ContactForm from "./ContactForm";
import {viewProfile} from "../services/public-service.js";
import "../styles/Contact.css";
import { MdEmail } from "react-icons/md";
import { FaCertificate, FaDownload, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

function Contact() {

    const [profile, setProfile] = useState({});

    useEffect(()=> {
        viewProfile().then((res) => {
            setProfile(res);
        });
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="content-title">Contact me</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card contact-dark-card">
                            <p><FaPhoneAlt size={30} /></p>
                            <h4 className="mt-2">{profile.mobile}</h4>
                            <h5 className="mt-3">Call on above number</h5>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="card contact-dark-card text-center">
                        <p><FaEnvelope size={30} /></p>
                        <h4 className="mt-2">{profile.email}</h4>
                        <h5 className="mt-3">
                        <a 
                            href={`mailto:${profile.email}`} 
                            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                        >
                            Mail me anytime
                        </a>
                        </h5>
                    </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-md-6">
                        <div className="description-box">
                            <h2 className="font-weight-bold">Message Me</h2>
                            <p className="mt-3">
                                Have a question, collaboration idea, or just want to say hello? I’d love to hear from you! 
                                Use the contact form below to send me a message directly. Whether you're interested in working together or 
                                simply want to chat about technology, feel free to reach out. 
                                I’m always open to new opportunities and connections. I'll get back to you as soon as possible. 
                                <br></br><i>Let’s connect and make something amazing together!</i>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <ContactForm></ContactForm>
                    </div>
                </div> */}
            </div>

        </>
    )
}

export default Contact;