import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { myAxios } from "../services/admin-helper.js";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/AdminInputForm.css";

export default function ViewFiles() {
    
  const [fileType, setFileType] = useState("");
  const [files, setFiles] = useState([]);

  // Fetch files by type
  const fetchFiles = async (type) => {
    if (!type) return;

    try {
      const response = await myAxios.get(`/admin/files/get/type/${type}`);
      setFiles(response.data);
    } catch (error) {
      setFiles([]);
      Swal.fire({
        icon: "info",
        title: "No Files",
        text: "No files found for this category",
      });
    }
  };

  // Handle delete
  const deleteFile = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This file will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await myAxios.delete(`/admin/files/delete/${id}`);
          Swal.fire("Deleted!", "File has been deleted.", "success");
          fetchFiles(fileType);
        } catch (error) {
          Swal.fire("Error!", "File could not be deleted.", "error");
        }
      }
    });
  };

  // Toggle hide/unhide (needs API update)
  const toggleHide = async (id, currentValue) => {
    try {
      await myAxios.patch(`/admin/files/hide/${id}?hidden=${!currentValue}`);

      Swal.fire({
        icon: "success",
        title: currentValue ? "File Unhidden" : "File Hidden",
      });

      fetchFiles(fileType);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Could not update hide status.",
      });
    }
  };

  return (
    <>
      <div className="p-0 bg-light">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2">
            <Sidebar />
          </div>

          {/* Main */}
          <div className="col-md-10">
            <div className="container">
              <div className="card p-4 shadow">

                <h3 className="fw-bold mb-4">View Files</h3>

                {/* File Type Dropdown */}
                <div className="row mb-4">
                  <div className="col-md-4">
                    <label className="admin-form-label">Select File Type</label>
                    <select
                      className="admin-form-control"
                      value={fileType}
                      onChange={(e) => {
                        setFileType(e.target.value);
                        fetchFiles(e.target.value);
                      }}
                    >
                      <option value="">Select</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Resume">Resume</option>
                    </select>
                  </div>
                </div>

                {/* Files Table */}
                {files.length > 0 ? (
                  <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>Description</th>
                        <th>File Type</th>
                        <th>Hidden?</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {files.map((file) => (
                        <tr key={file.fileId}>
                          <td>{file.description}</td>
                          <td>{file.fileType}</td>
                          <td>
                            {file.hidden ? (
                              <span className="badge bg-danger">Hidden</span>
                            ) : (
                              <span className="badge bg-success">Visible</span>
                            )}
                          </td>

                          <td>
                            {/* View Button */}
                            <a 
                                href={`http://localhost:8030${file.fileName}`}
                                target="_blank"
                                className="btn btn-sm btn-info"
                              >
                                View File
                              </a>

                            {/* Hide/Unhide Button */}
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => toggleHide(file.fileId, file.hidden)}
                            >
                              {file.hidden ? "Unhide" : "Hide"}
                            </button>

                            {/* Delete Button */}
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteFile(file.fileId)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  fileType && (
                    <h5 className="text-center mt-4 text-muted">
                      No files found for '{fileType}'
                    </h5>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
