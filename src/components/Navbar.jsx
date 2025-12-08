
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/Navbar.css";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import DownloadResume from "./DownloadResume";
import { useEffect, useState } from "react";
import { publicAxios, BASE_URL } from "../services/public-helper.js";
import Swal from "sweetalert2";
import { FaFileAlt } from "react-icons/fa";

function Navbar() {

  const [resume, setResume] = useState(null);
    const [isResumeOpened, setIsResumeOpened] = useState(false);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await publicAxios.get("/files/get/by-type/Resume");
                if (res.data.length > 0) {
                    setResume(res.data[0]);
                } else {
                    setResume(null);
                }
            } catch (error) {
                setResume(null);
            }
        };
        fetchResume();
    }, []);

    const downloadResume = () => {
        if (!resume) {
            Swal.fire({
                icon: "info",
                title: "Not Found",
                text: "Resume is not available to download.",
            });
            return;
        }

        // Backend returns: fileName = "/uploads/xxx.pdf"
        const url = `${BASE_URL}${resume.fileName}`;

        // const link = document.createElement("a");
        // link.href = url;
        // link.download = resume.originalFileName;
        // link.click();
        window.open(url, "_blank");
        setIsResumeOpened(true);
        return;
    };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container">

    {/* BRAND */}
    <NavLink className="navbar-brand" to="/">
      <div className="web-title d-flex align-items-center">
        <FaAngleLeft size={28} />
        <span className="mx-1">GhodkeMayuresh.Dev</span>
        <FaAngleRight size={28} />
      </div>
    </NavLink>

    {/* TOGGLER */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#mainNavbar"
      aria-controls="mainNavbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
      style={{
        color:"#51f5f0ff"
      }}
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* NAV LINKS */}
    <div className="collapse navbar-collapse" id="mainNavbar">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/projects">
            Projects
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </li>

      </ul>

      {/* RESUME BUTTON - moves down on mobile */}
      <button
        className="btn mt-2 mt-lg-0"
        // onClick={downloadResume}
        onClick={()=> {window.open("/uploads/MayureshGhodke_JavaFullStackResume.pdf", "_blank")}}
        style={{
          backgroundColor: "#f77f00",
          fontWeight: "bold",
          color: "white",
          borderRadius: "20px",
        }}
      >
        <FaFileAlt size={16} /> Resume
      </button>
    </div>
  </div>
</nav>

    </>
  );
}

export default Navbar;
