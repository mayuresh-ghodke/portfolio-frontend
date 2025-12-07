
import React from "react";
import "../styles/App.css";
import { FaArrowUp } from "react-icons/fa";

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="container-fluid mt-3 sticky-end p-2 footer">
        <div className="row">
          <div className="col-6 col-md-6 d-flex justify-content-start">
            <h6 style={{ marginLeft:'20px'}}>©{new Date().getFullYear()}. All Rights Reserved.</h6>
          </div>
          <div className="col-6 col-md-6 d-flex justify-content-end">
            <h6 
              style={{ marginRight:'20px', 
              cursor:'pointer',
              color: '#51f5f0ff' 
              }}
              onClick={scrollToTop}
            >
              <FaArrowUp size={30}/>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
