import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Footer from './components/Footer.jsx';
import Contact from "./pages/Contact.jsx";
import Projects from './pages/Projects.jsx';

import Dashboard from './admin-components/Dashboard.jsx';
import ProfileSection from './admin-components/ProfileSection.jsx';
import ViewContactMessages from './admin-components/ViewContactMessages.jsx';
import ViewSkills from './admin-components/ViewSkills.jsx';
import ViewProjects from './admin-components/ViewProjects.jsx';
import AboutInfo from './admin-components/ManageAboutInfo.jsx';
import AddEducation from './admin-components/AddEducation.jsx';
import ViewEducation from './admin-components/ViewEducation.jsx';
import AddProject from './admin-components/AddProject.jsx';

import LoginPage from "./admin-components/LoginPage";   
import ManageExperience from './admin-components/ManageExperience.jsx';
import UploadFiles from './admin-components/UploadFiles.jsx';
import ViewFiles from './admin-components/ViewFiles.jsx';
import ViewCertificates from './components/ViewCertificates.jsx';
import ResetPassword from './admin-components/ResetPassword.jsx';
import ForgotPassword from './admin-components/ForgotPassword.jsx';
import Education from './pages/Education.jsx';


function ProtectedRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("logged_in") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}



function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/certificates" element={<ViewCertificates />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin/profile"
          element={<ProtectedRoute><ProfileSection /></ProtectedRoute>}
        />
        <Route
          path="/admin/view-contacts"
          element={<ProtectedRoute><ViewContactMessages /></ProtectedRoute>}
        />
        <Route
          path="/admin/view-skills"
          element={<ProtectedRoute><ViewSkills /></ProtectedRoute>}
        />
        <Route
          path="/admin/projects"
          element={<ProtectedRoute><ViewProjects /></ProtectedRoute>}
        />
        <Route
          path="/admin/about"
          element={<ProtectedRoute><AboutInfo /></ProtectedRoute>}
        />
        <Route
          path="/admin/add-education"
          element={<ProtectedRoute><AddEducation /></ProtectedRoute>}
        />
        <Route
          path="/admin/view-education"
          element={<ProtectedRoute><ViewEducation /></ProtectedRoute>}
        />
        <Route
          path="/admin/add-project"
          element={<ProtectedRoute><AddProject /></ProtectedRoute>}
        />
        <Route
          path="/admin/experience"
          element={<ProtectedRoute><ManageExperience /></ProtectedRoute>}
        />

        <Route
          path="/admin/files"
          element={<ProtectedRoute><UploadFiles /></ProtectedRoute>}
        />

        <Route
          path="/admin/files/view"
          element={<ProtectedRoute><ViewFiles /></ProtectedRoute>}
        />

        <Route
          path="/admin/password/reset"
          element={<ProtectedRoute><ResetPassword /></ProtectedRoute>}
        />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        pauseOnHover
        theme="colored"
      />
      <AppContent />
    </Router>
  );
}

export default App;
