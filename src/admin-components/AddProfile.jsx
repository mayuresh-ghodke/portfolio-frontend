import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { myAxios } from "../services/admin-helper.js";
import "../styles/App.css";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/ProfileSection.css";

function AddProfile() {
    
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fathersName: "",
    dob: "",
    city: "",
    address: "",
    mobile: "",
    email: "",
    linkedInUrl: "",
    githubUrl: "",
    instaUrl: "",
    fbUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "Please fill all the required information.",
        confirmButtonText: "OK"
      });
      return;
    }

    const myData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      fathersName: formData.fathersName,
      dob: formData.dob,
      city: formData.city,
      address: formData.address,
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,
      linkedInUrl: formData.linkedInUrl,
      githubUrl: formData.githubUrl,
      instaUrl: formData.instaUrl,
      fbUrl: formData.fbUrl
    };

    myAxios
      .post("/admin/profile/update", myData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your details have been submitted successfully.",
          confirmButtonText: "OK"
        });

        setFormData({
          firstName: "",
          lastName: "",
          fathersName: "",
          dob: "",
          city: "",
          address: "",
          mobile: "",
          email: "",
          password:"",
          linkedInUrl: "",
          githubUrl: "",
          instaUrl: "",
          fbUrl: ""
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Information not saved. Something went wrong.",
          confirmButtonText: "OK"
        });
        console.error("Error saving profile data:", error);
      });
  };

  return (
    <>
      <div className="p-0 bg-light">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>

          <div className="col-md-10">
            <div className="container mt-4">
              <div className="row">
                <div className="col-md-12 mx-auto">
                  <div className="card p-4 shadow">

                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <h3 className="fw-bold">Profile</h3>
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                      <div className="row">

                        {/* Personal Information */}
                        <div className="col-md-6">
                          <h5 className="mb-3 font-weight-bold">Personal Information</h5>

                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label className="form-label">First Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="form-label">Last Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-md-6">
                              <label className="form-label">Father's Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Father's Name"
                                name="fathersName"
                                value={formData.fathersName}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="form-label">Date of Birth</label>
                              <input
                                type="date"
                                className="form-control"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">Mobile Number *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Mobile Number"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="form-label">Email Address *</label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">Create Password *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Password (min 8 characters)"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength={8}       
                                required
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">City *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="form-label">Address</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="col-md-6">
                          <h5 className="mt-2 mb-3">Social Links</h5>

                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label">LinkedIn URL</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="LinkedIn URL"
                                name="linkedInUrl"
                                value={formData.linkedInUrl}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="form-label">Github URL</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Github URL"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="form-label">Instagram Link</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Instagram URL"
                                name="instaUrl"
                                value={formData.instaUrl}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="col-md-6">
                              <label className="form-label">Facebook Link</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Facebook URL"
                                name="fbUrl"
                                value={formData.fbUrl}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-center">
                        <button type="submit" className="btn btn-primary d-flex d-block">
                          Submit
                        </button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AddProfile;
