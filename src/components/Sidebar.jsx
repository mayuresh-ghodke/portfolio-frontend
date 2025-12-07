import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";
import {handleLogout} from "../services/admin-service.js";

function Sidebar() {

  const navigate = useNavigate();
      
    const handleLogoutbtn = () => {
      if(handleLogout()){
          navigate("/login");
      }
      else{
          navigate("/logout");
      }; 
  }

  return (
    <>
      {/* Mobile: Top Navbar */}
      <nav className="navbar navbar-dark bg-dark d-lg-none px-3">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>

      {/* Sidebar */}
      <div className="sidebar-container">
        <div className="collapse d-lg-block sidebar bg-dark" id="sidebarMenu">

          <div className="sidebar-header">
            <h4>Admin Panel</h4>
          </div>

          <ul className="nav flex-column sidebar-links">

            {/* Dashboard */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/dashboard">
                Home
              </NavLink>
            </li>

            {/* Profile Section */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/profile">
                Profile
              </NavLink>
            </li>

            {/* About Section */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/about">
                About Info
              </NavLink>
            </li>

            {/* Skills Section */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/view-skills">
                View Skills
              </NavLink>
            </li>

            {/* Projects Section */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/add-project">
                Add Project
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/projects">
                View Projects
              </NavLink>
            </li>

            {/* Education Section */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/add-education">
                Add Education
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/view-education">
                View Education
              </NavLink>
            </li>

            {/* Messages */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/view-contacts">
                View Messages
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/experience">
                Manage Experience
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/files">
                Upload Files
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/files/view">
                View Files
              </NavLink>
            </li>

            <li className="nav-item mr-2">
              <NavLink className="p-3" to="/admin/password/reset">
                  <button className="btn btn-sm btn-warning">Reset Password</button>
              </NavLink>
            </li>

            <li className="nav-item mr-2">
              <NavLink className="p-3" to="/admin/logout">
                  <button className="btn btn-sm btn-danger" onClick={handleLogoutbtn}>Logout</button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
