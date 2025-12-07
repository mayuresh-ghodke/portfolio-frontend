import React, { useState } from "react";
import "../styles/UpdateProjectModal.css";
import "../styles/AdminInputForm.css";
import { updateProject } from "../services/admin-service";

function UpdateProjectModal({ project, onClose, onSave }) {
  const [form, setForm] = useState({ ...project });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateBtn = async () => {
    try {
      setIsSaving(true);
      const updatedProject = await updateProject(form.projectId, form);
      setIsSaving(false);
      onSave(updatedProject); // Notify parent about the updated project
      onClose(); // Close modal
    } catch (err) {
      console.error("Failed to update project:", err);
      setIsSaving(false);
      alert("Failed to update project. Please try again.");
    }
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-custom shadow admin-form-card">
        <h4 className="text-dark">Update Project</h4>

        <div className="mb-3">
          <label className="admin-form-label">Name</label>
          <input
            className="admin-form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="admin-form-label">Subtitle</label>
          <input
            className="admin-form-control"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="admin-form-label">Info</label>
          <textarea
            className="admin-form-control"
            name="info"
            value={form.info}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="admin-form-label">GitHub Link</label>
          <input
            className="admin-form-control"
            name="github"
            value={form.github}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="admin-form-label">Live Link</label>
          <input
            className="admin-form-control"
            name="link"
            value={form.link}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button className="btn btn-secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleUpdateBtn} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProjectModal;
