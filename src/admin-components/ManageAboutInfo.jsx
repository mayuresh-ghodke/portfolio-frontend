import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/AdminInputForm.css";

import { viewAboutInfo, deleteAboutInfo } from "../services/admin-service.js";
import { myAxios } from "../services/admin-helper.js";

function AboutInfo() {

  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------- FETCH ABOUT INFO --------
  const fetchAbout = async () => {
    setLoading(true);
    const result = await viewAboutInfo();

    if (result.success) {
      setAboutInfo(result.data);
    } else {
        setAboutInfo(null);
        Swal.fire("Info", result.error, "info");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // -------- FORM STATE --------
  const [formData, setFormData] = useState({
    aboutTitle: "",
    aboutInfo: "",
    aboutBio: "",
  });

  const [imgFile, setImgFile] = useState(null); // file object
  const [previewImage, setPreviewImage] = useState(null); // preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle rich text
  const handleAboutInfoChange = (value) => {
    setFormData({ ...formData, aboutInfo: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // -------- SAVE / UPDATE --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.aboutTitle || !formData.aboutInfo) {
      Swal.fire("Warning!", "Please fill all required fields.", "warning");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("aboutTitle", formData.aboutTitle);
      fd.append("aboutInfo", formData.aboutInfo);
      fd.append("aboutBio", formData.aboutBio);

      if (imgFile) {
        fd.append("imgFile", imgFile);
      }

      await myAxios.post("/admin/about/save", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success!", "About information saved!", "success");

      setFormData({
        aboutTitle: "",
        aboutInfo: "",
        aboutBio: "",
      });

      setImgFile(null);
      setPreviewImage(null);

      fetchAbout();
    } catch (error) {
      Swal.fire("Error!", "Unable to save info.", "error");
      console.error(error);
    }
  };

  // -------- DELETE --------
  const handleDelete = async () => {
    if (!window.confirm("Delete About Information?")) return;

    try {
      const result = await deleteAboutInfo();
      if (result) {
        Swal.fire("Deleted!", "About information removed.", "success");
        setAboutInfo(null);
      }
    } catch (error) {
      Swal.fire("Failed!", "Cannot delete information.", "error");
      console.error(error);
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
    <div className="p-0">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">
          <div className="container">

            {/* FORM */}
            <div className="card p-4 shadow">
              <h3 className="mb-4 text-dark">Add / Update About Info</h3>

              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="admin-form-label">About Title *</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      name="aboutTitle"
                      value={formData.aboutTitle}
                      onChange={handleChange}
                      placeholder="Enter title"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="admin-form-label">Select Image</label>
                    <input
                      type="file"
                      className="admin-form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>


                {/* Preview Image */}
                {previewImage && (
                  <div className="mb-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxWidth: "200px" }}
                    />
                  </div>
                )}

                <div className="col-md-12">
                    <label className="form-label fw-semibold">About Bio</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      name="admin-aboutBio"
                      value={formData.aboutBio}
                      onChange={handleChange}
                      placeholder="Enter bio"
                    />
                  </div>

                <div className="mb-3">
                  <label className="admin-form-label fw-semibold">About Information *</label>
                  <ReactQuill
                    value={formData.aboutInfo}
                    onChange={handleAboutInfoChange}
                    modules={modules}
                  />
                </div>

                <button className="btn btn-primary px-4 mt-3">Submit</button>
              </form>
            </div>

            {/* DISPLAY */}
            <div className="card shadow-lg border-0 rounded-4 p-4 mt-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className=" text-dark">About Information</h3>

                {aboutInfo && (
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                )}
              </div>

              {loading ? (
                <p className="text-center fs-5">Loading...</p>
              ) : !aboutInfo ? (
                <p className="text-center fs-5">No information added yet.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-borderless align-middle">
                    <tbody>
                      <tr>
                        <th className=" text-dark" style={{ width: "25%" }}>
                          Title:
                        </th>
                        <td>{aboutInfo.aboutTitle}</td>
                      </tr>

                      <tr>
                        <th className=" text-dark" style={{ width: "25%" }}>
                          Bio:
                        </th>
                        <td>{aboutInfo.aboutBio}</td>
                      </tr>

                      <tr>
                        <th className="text-dark">Information:</th>
                        <td>
                          {aboutInfo?.aboutInfo && (
                            <div
                              dangerouslySetInnerHTML={{ __html: aboutInfo.aboutInfo }}
                              className="bg-white text-dark"
                            />
                          )}
                        </td>
                      </tr>

                      <tr>
                        <th className=" text-dark">Image:</th>
                        <td>
                          {aboutInfo?.imgUrl ? (
                            <img
                              src={aboutInfo.imgUrl}
                              className="img-thumbnail"
                              style={{ maxWidth: "200px" }}
                              alt="About"
                            />
                          ) : (
                            <span className="text-muted">No Image</span>
                          )}
                        </td>
                      </tr>
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

export default AboutInfo;
