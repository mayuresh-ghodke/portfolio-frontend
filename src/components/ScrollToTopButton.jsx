import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTopButton() {
    
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {visible && (
        <div
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            background: "#333",
            color: "#fff",
            padding: "12px 14px",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 9999
          }}
        >
          <FaArrowUp />
        </div>
      )}
    </>
  );
}

export default ScrollToTopButton;
