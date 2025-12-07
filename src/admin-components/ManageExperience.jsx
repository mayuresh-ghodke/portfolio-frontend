import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/AdminInputForm.css";

import {
  viewExperience,
  saveExperience,
  updateExperience,
  deleteExperience,
  viewExperienceById,
} from "../services/admin-service.js";

function ManageExperience() {
  // ===== All Experiences =====
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
  setLoading(true);
  try {
    const data = await viewExperience(); // <-- returns array directly
    setExperiences(data);
  } catch (err) {
    Swal.fire("Error", "Unable to fetch experiences", "error");
  }
  setLoading(false);
};


  useEffect(() => {
    fetchExperiences();
  }, []);

  // ===== FORM =====
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    roleName: "",
    location: "",
    startedIn: "",
    endedOn: "",
    workMode: "",
    description: "",
    jobType: "",
    hidden: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      companyName: "",
      roleName: "",
      location: "",
      startedIn: "",
      endedOn: "",
      workMode: "",
      description: "",
      jobType: "",
      hidden: false,
    });
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.companyName || !formData.roleName || !formData.startedIn) {
      Swal.fire("Warning", "Company, Role, and Start date are required", "warning");
      return;
    }

    try {
      if (editingId) {
        await updateExperience(editingId, formData);
        Swal.fire("Updated!", "Experience updated successfully", "success");
      } else {
        await saveExperience(formData);
        Swal.fire("Saved!", "Experience added successfully", "success");
      }

      resetForm();
      fetchExperiences();
    } catch (error) {
      Swal.fire("Error!", "Operation failed", "error");
      console.error(error);
    }
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await deleteExperience(id);
      Swal.fire("Deleted!", "Experience removed", "success");
      fetchExperiences();
    } catch (error) {
      Swal.fire("Error!", "Cannot delete experience", "error");
    }
  };

  // ===== EDIT =====
  const handleEdit = async (id) => {
    const res = await viewExperienceById(id);
    if (res.success) {
      setFormData({
        companyName: res.data.companyName,
        roleName: res.data.roleName,
        location: res.data.location,
        startedIn: res.data.startedIn,
        endedOn: res.data.endedOn,
        workMode: res.data.workMode,
        description: res.data.description,
        jobType: res.data.jobType,
        hidden: res.data.hidden,
      });

      setEditingId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="p-0 bg-light">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">
          <div className="container">

            {/* FORM CARD */}
            <div className=" card p-4">
              <h3 className="font-weight-bold mb-4">
                {editingId ? "Edit Experience" : "Add Experience"}
              </h3>

              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="admin-form-label">Company Name *</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="admin-form-label">Role Name *</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      name="roleName"
                      value={formData.roleName}
                      onChange={handleChange}
                      placeholder="Enter role name"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="admin-form-label">Location</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter location"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="admin-form-label">Started In *</label>
                    <input
                      type="date"
                      className="admin-form-control"
                      name="startedIn"
                      value={formData.startedIn}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="admin-form-label">Ended On</label>
                    <input
                      type="date"
                      className="admin-form-control"
                      name="endedOn"
                      value={formData.endedOn}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="admin-form-label">Work Mode</label>
                    <select
                      className="admin-form-control"
                      name="workMode"
                      value={formData.workMode}
                      onChange={handleChange}
                    >
                      <option value="">Select Work Mode</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="admin-form-label">Job Type</label>
                    <select
                      className="admin-form-control"
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                    >
                      <option value="">Select Job Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3 d-flex align-items-center">
                    <div>
                      <label className="admin-form-label me-2">Hidden</label>
                      <input
                        type="checkbox"
                        name="hidden"
                        checked={formData.hidden}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="admin-form-label">Description</label>
                  <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    modules={modules}
                  />
                </div>

                <button className="btn btn-primary px-4 mt-3">
                  {editingId ? "Update" : "Submit"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary px-4 mt-3 ms-2"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>

            {/* TABLE CARD */}
            <div className="card p-4 mt-5">
              <h3 className="font-weight-bold mb-4">Experience Records</h3>

              {loading ? (
                <p className="text-center text-muted fs-5">Loading...</p>
              ) : experiences.length === 0 ? (
                <p className="text-center text-muted fs-5">No experience added yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Duration</th>
                        <th>Job Type</th>
                        <th>Work Mode</th>
                        <th>Hidden</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {experiences.map((exp, index) => (
                        <tr key={exp.expId}>
                          <td>{index + 1}</td>
                          <td>{exp.companyName}</td>
                          <td>{exp.roleName}</td>
                          <td>
                            {exp.startedIn} → {exp.endedOn || "Present"}
                          </td>
                          <td>{exp.jobType}</td>
                          <td>{exp.workMode}</td>
                          <td>{exp.hidden ? "Yes" : "No"}</td>

                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleEdit(exp.expId)}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(exp.expId)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageExperience;
