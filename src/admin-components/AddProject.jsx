import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { myAxios } from "../services/admin-helper.js";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/AdminInputForm.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddProject() {
  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    startDate: "",
    endDate: "",
    images: [],
    info: "",
    tech: [],
    github: "",
    link: "",
    hidden: false,
  });

  // Handle normal input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  // Handle tech stack
  const handleTechChange = (e) => {
    const techArray = e.target.value.split(",").map((t) => t.trim());
    setFormData((prev) => ({ ...prev, tech: techArray }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.subtitle) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "Project name and subtitle are required.",
      });
      return;
    }

    const projectData = new FormData();
    projectData.append("name", formData.name);
    projectData.append("subtitle", formData.subtitle);
    projectData.append("startDate", formData.startDate);
    projectData.append("endDate", formData.endDate);
    projectData.append("info", formData.info);
    projectData.append("github", formData.github);
    projectData.append("link", formData.link);
    projectData.append("hidden", formData.hidden);

    // Add images
    formData.images.forEach((img) => {
      projectData.append("images", img);
    });

    // Add tech list
    formData.tech.forEach((t) => {
      projectData.append("tech", t);
    });

    try {      
      await myAxios.post("/admin/project/save", projectData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Project added successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        subtitle: "",
        startDate: "",
        endDate: "",
        images: [],
        info: "",
        tech: [],
        github: "",
        link: "",
        hidden: false,
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Project not saved. Something went wrong.",
      });
      console.error("Project Save Error:", error);
    }
  };

  return (
    <>
      <div className="p-0 bg-light">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>

          <div className="col-md-10">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="card p-4 shadow">

                    <h3 className="text-dark">Add Project</h3>

                    <form onSubmit={handleSubmit}>

                      {/* ---- ROW 1 ---- */}
                      <div className="row mb-3">
                        <div className="col-md-3">
                          <label className="admin-form-label">Project Name *</label>
                          <input
                            type="text"
                            className="admin-form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter project name"
                            required
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="admin-form-label">Subtitle *</label>
                          <input
                            type="text"
                            className="admin-form-control"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            placeholder="Enter subtitle"
                            required
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="admin-form-label">Start Date</label>
                          <input
                            type="date"
                            className="admin-form-control"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="admin-form-label">End Date</label>
                          <input
                            type="date"
                            className="admin-form-control"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* ---- TECH STACK ---- */}
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <label className="admin-form-label">Tech Stack (comma separated)</label>
                          <input
                            type="text"
                            className="admin-form-control"
                            placeholder="Enter tech stack used"
                            onChange={handleTechChange}
                          />
                        </div>
                      </div>

                      {/* ---- LIVE + GITHUB ---- */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="admin-form-label">Live Link</label>
                          <input
                            type="text"
                            className="admin-form-control"
                            name="link"
                            value={formData.link}
                            placeholder="Enter live link"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="admin-form-label">GitHub Link</label>
                          <input
                            type="text"
                            className="admin-form-control"
                            name="github"
                            value={formData.github}
                            placeholder="Enter github link"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* ---- DESCRIPTION ---- */}
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <label className="admin-form-label">Project Description</label>

                          <ReactQuill
                            value={formData.info}
                            onChange={(value) =>
                              setFormData((prev) => ({ ...prev, info: value }))
                            }
                            theme="snow"
                            className="admin-form-textarea"
                            style={{ height: "250px" }}
                          />
                        </div>
                      </div>

                      {/* ---- IMAGE + HIDE ---- */}
                      <div className="row mb-3" style={{marginTop:50}}>
                        <div className="col-md-6">
                          <label className="admin-form-label">Upload Images</label>
                          <input
                            type="file"
                            className="admin-form-control"
                            multiple
                            onChange={handleImageChange}
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="admin-form-label">Hide Project?</label>
                          <select
                            name="hidden"
                            className="admin-form-control"
                            value={formData.hidden}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                hidden: e.target.value === "true",
                              })
                            }
                          >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                          </select>
                        </div>
                      </div>

                      {/* ---- SUBMIT ---- */}
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary px-4">
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

export default AddProject;
