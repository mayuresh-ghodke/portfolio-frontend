import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/AdminInputForm.css";

const iconMapArr = [
    "java",
    "springboot",
    "html5",
    "css3",
    "bootstrap",
    "javascript",
    "reactjs",
    "hibernate",
    "spring security",
    "jwt",
    "rest api",
    "git",
    "github",
    "docker",
    "postman",
    "mysql",
    "jira",
    "unknown"
];

function AddSkillModal({ show, onClose, onSave, categories }) {

  const [skillName, setSkillName] = useState("");
  const [iconName, setIconName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  if (!show) 
    return null;

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!skillName || !iconName || !categoryId) {
      alert("All fields are required!");
      return;
    }

    onSave({ skillName, iconName, categoryId });

    setSkillName("");
    setIconName("");
    setCategoryId("");
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title text-dark">Add New Skill</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>

              {/* Skill Name */}
              <div className="mb-3">
                <label className="admin-form-label">Skill Name</label>
                <input
                  type="text"
                  className="admin-form-control"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="Enter skill name"
                  required
                />
              </div>

              {/* Icon Name */}
              <div className="mb-3">
                <label className="admin-form-label">Icon Name</label>
                <input
                  type="text"
                  className="admin-form-control"
                  value={iconName}
                  placeholder="Enter icon name"
                  onChange={(e) => setIconName(e.target.value)}
                />

                <div>
                  {iconMapArr.map((icon, index) => (
                    <sub key={index}>
                      {icon}{index !== iconMapArr.length - 1 && ", "}
                    </sub>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="admin-form-label">Category</label>
                <select
                  className="form-select admin-form-control"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>

                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.categoryName}
                      </option>
                    ))
                  ) : (
                    <option>No categories found</option>
                  )}
                </select>
              </div>

              {/* Footer buttons */}
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Save Skill
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSkillModal;
