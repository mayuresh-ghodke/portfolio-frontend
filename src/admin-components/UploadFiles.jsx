import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { myAxios } from "../services/admin-helper.js";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/AdminInputForm.css";

function UploadFiles() {

  const [formData, setFormData] = useState({
    description: "",
    filetype: "",
    hidden: false,
    file: null,
  });

  // Handle normal inputs
  const handleChange = (e) => {
    
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // File upload (single file because backend accepts only 1)
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description || !formData.filetype || !formData.file) {
      Swal.fire({
        icon: "warning",
        title: "Required!",
        text: "All fields are required including the file.",
      });
      return;
    }

    const uploadData = new FormData();
    uploadData.append("description", formData.description);
    uploadData.append("fileType", formData.filetype);
    uploadData.append("hidden", formData.hidden);
    uploadData.append("uploadedFile", formData.file);

    try {
      await myAxios.post("/admin/files/save", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "File uploaded successfully!",
      });

      setFormData({
        description: "",
        filetype: "",
        hidden: false,
        file: null,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed!",
        text: "Something went wrong.",
      });
      console.error("UPLOAD ERROR:", error);
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
                <div className="col-md-12 mx-auto">
                  <div className="card p-4 shadow">
                    <h3 className="fw-bold mb-4">Upload File</h3>
                    <form onSubmit={handleSubmit}>
                      {/* ---- DESCRIPTION ---- */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="admin-form-label">File Description *</label>
                          <input
                            type="text"
                            className="admin-form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter file description"
                          />
                        </div>
                      </div>

                      {/* ---- FILE TYPE ---- */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="admin-form-label">Select File Type *</label>
                          <select
                            name="filetype"
                            className="admin-form-control"
                            value={formData.filetype}
                            onChange={handleChange}
                          >
                            <option value="">Select File Type</option>
                            <option value="Certificate">Certificate</option>
                            <option value="Resume">Resume</option>
                          </select>
                        </div>
                      </div>

                      {/* ---- FILE UPLOAD ---- */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="admin-form-label">Upload File *</label>
                          <input
                            type="file"
                            className="admin-form-control"
                            onChange={handleFileChange}
                          />
                        </div>

                        {/* HIDDEN FIELD */}
                        <div className="col-md-6">
                          <label className="admin-form-label">Hide File Details?</label>
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

export default UploadFiles;
