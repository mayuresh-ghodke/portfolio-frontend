import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getProfile, deleteProfile, updateProfile } from "../services/admin-service";
import Swal from "sweetalert2";
import "../styles/ProfileView.css";
import "../styles/AdminInputForm.css";

function ProfileSection() {
  
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // FORM DATA STATE
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fathersName: "",
    dob: "",
    mobile: "",
    email: "",
    city: "",
    address: "",
    linkedInUrl: "",
    githubUrl: "",
    instaUrl: "",
    fbUrl: "",
  });

  // LOAD PROFILE
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    getProfile()
      .then((res) => {
        setProfile(res);
        setFormData(res); // pre-fill modal form
      })
      .catch(() => {
        setProfile(null);
      });
  };

  // INPUT HANDLER
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // UPDATE PROFILE
  const handleUpdate = () => {
    updateProfile(formData)
      .then(() => {
        Swal.fire("Updated", "Profile updated successfully!", "success");

        // instant UI update
        setProfile(formData);
        setShowModal(false);

        // also fetch fresh data
        loadProfile();
      })
      .catch(() => Swal.fire("Error", "Failed to update profile", "error"));
  };

  // DELETE PROFILE
  const handleDelete = () => {
    Swal.fire({
      title: "Delete?",
      text: "This will remove your entire profile.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteProfile()
          .then(() => {
            Swal.fire("Deleted", "Profile removed", "success");
            setProfile(null);
            setShowModal(false);
          })
          .catch(() => Swal.fire("Error", "Failed to delete profile", "error"));
      }
    });
  };

  // IF NO PROFILE → SHOW ADD PROFILE FORM
  if (profile === null) {
  return (
    <>
      <Sidebar />
      <div className="col-md-10 mt-5 text-center">
        <h3>No Profile Found</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Create Profile
        </button>
      </div>
    </>
  );
}


  return (
    <div className="row">

      {/* SIDEBAR */}
      <div className="col-md-2">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="col-md-10 mt-4">

        {/* ACTION BUTTONS */}
        <div className="mb-3 text-end">
          <button className="btn btn-warning mx-2" onClick={() => setShowModal(true)}>
            Edit Profile
          </button>
          {/* <button className="btn btn-danger mx-2" onClick={handleDelete}>
            Delete
          </button> */}
        </div>

        {/* PROFILE VIEW */}
        {profile && <>
          <div className="row">
          {/* PERSONAL INFORMATION */}
          <div className="col-md-5 card p-4 shadow profile-section">
            <h4 className="fw-bold mb-3">Personal Information</h4>
            <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
            <p><strong>Father's Name:</strong> {profile.fathersName}</p>
            <p><strong>DOB:</strong> {profile.dob}</p>
            <p><strong>Mobile:</strong> {profile.mobile}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>City:</strong> {profile.city}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>

          {/* SOCIAL LINKS */}
          <div className="col-md-5 card p-4 ml-5 shadow profile-section">
            <h4 className="fw-bold mb-3">Social Links</h4>
            <p><strong>LinkedIn:</strong> {profile.linkedInUrl}</p>
            <p><strong>Github:</strong> {profile.githubUrl}</p>
            <p><strong>Instagram:</strong> {profile.instaUrl}</p>
            <p><strong>Facebook:</strong> {profile.fbUrl}</p>
          </div>
        </div>
        </>}
      </div>

      {/* ------------------- MODAL ------------------- */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{ background: "#1e293b", color: "#fff" }}>

            {/* HEADER */}
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Edit Profile</h5>
              <button
                className="btn-close btn-close-white"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            {/* BODY */}
            <div className="modal-body">

              <div className="row">
                {/* PERSONAL DETAILS */}
                <div className="col-md-6">
                  <h5 className="fw-bold mb-3">Personal Details</h5>

                  <input name="firstName" className="admin-form-control mb-2"
                    placeholder="First Name" value={formData.firstName} onChange={handleInput} />

                  <input name="lastName" className="admin-form-control mb-2"
                    placeholder="Last Name" value={formData.lastName} onChange={handleInput} />

                  <input name="fathersName" className="admin-form-control mb-2"
                    placeholder="Father's Name" value={formData.fathersName} onChange={handleInput} />

                  <input name="dob" className="admin-form-control mb-2"
                    placeholder="DOB" value={formData.dob} onChange={handleInput} />

                  <input name="mobile" className="admin-form-control mb-2"
                    placeholder="Mobile" value={formData.mobile} onChange={handleInput} />

                  <input name="email" className="admin-form-control mb-2"
                    placeholder="Email" value={formData.email} onChange={handleInput} />
                    
                  <input name="city" className="admin-form-control mb-2"
                    placeholder="City" value={formData.city} onChange={handleInput} />

                  <textarea name="address" className="admin-form-control mb-2"
                    placeholder="Address" value={formData.address} onChange={handleInput} />
                </div>

                {/* SOCIAL LINKS */}
                <div className="col-md-6">
                  <h5 className="fw-bold mb-3">Social Links</h5>

                  <input name="linkedInUrl" className="admin-form-control mb-2"
                    placeholder="LinkedIn" value={formData.linkedInUrl} onChange={handleInput} />

                  <input name="githubUrl" className="admin-form-control mb-2"
                    placeholder="GitHub" value={formData.githubUrl} onChange={handleInput} />

                  <input name="instaUrl" className="admin-form-control mb-2"
                    placeholder="Instagram" value={formData.instaUrl} onChange={handleInput} />

                  <input name="fbUrl" className="admin-form-control mb-2"
                    placeholder="Facebook" value={formData.fbUrl} onChange={handleInput} />
                </div>
              </div>

            </div>

            {/* FOOTER */}
            <div className="modal-footer border-0">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-success" onClick={handleUpdate}>Save</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default ProfileSection;
