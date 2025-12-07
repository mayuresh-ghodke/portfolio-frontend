import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/AdminInputForm.css";
import AddSkillModal from "../components/AddSkillModal";

// SERVICE IMPORTS
import { 
  viewSkills,
  deleteSkill,
  updateSkill,
  saveSkill,
  viewCategories
} from "../services/admin-service.js";

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";



function ViewSkills() {

  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);


  useEffect(() => {
    loadSkills();
    loadCategories();

  }, []);

  const loadSkills = () => {
    viewSkills()
      .then((data) => setSkills(data))
      .catch((error) => console.error("Error fetching skills:", error));
  };

  const loadCategories = () => {
    viewCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  // ================= ADD SKILL =================
  const handleAdd = () => {
    setShowAddModal(true);
  };

  const saveNewSkill = async ({ skillName, iconName, categoryId }) => {
    try {
      await saveSkill({ skillName, iconName }, categoryId);
      alert("Skill added successfully!");
      loadSkills();
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding skill:", err);
      alert("Error while adding skill");
    }
  };

  // ================= UPDATE SKILL =================
  const handleUpdate = async (skill) => {
    const newName = prompt("Enter new skill name:", skill.skillName);
    if (!newName || newName.trim() === "") return;

    const iconName = prompt("Enter new icon name:", skill.iconName);

    const categoryNames = categories.map((c) => c.categoryName).join(", ");
    const newCategoryName = prompt(
      `Choose New Category:\n${categoryNames}`,
      skill.category.categoryName
    );

    const found = categories.find(
      (c) =>
        c.categoryName.toLowerCase() ===
        newCategoryName?.trim().toLowerCase()
    );

    if (!found) {
      alert("Invalid category!");
      return;
    }

    const updatedSkill = {
      skillId: skill.skillId,
      skillName: newName.trim(),
      iconName: iconName.trim()
    };

    try {
      await updateSkill(skill.skillId, updatedSkill, found.categoryId);
      alert("Skill updated successfully!");
      loadSkills();
    } catch (error) {
      console.error("Error updating skill:", error);
      alert("Error while updating skill");
    }
  };

  // ================= DELETE SKILL =================
  const handleDelete = async (skillId) => {
    if (!window.confirm("Are you sure to delete this skill?")) return;

    try {
      await deleteSkill(skillId);
      alert("Skill deleted successfully!");
      loadSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Error while deleting skill");
    }
  };

  return (
    <div className="p-0 bg-light min-vh-100">
      <div className="row g-0">

        {/* Sidebar */}
        <div className="col-md-2 bg-white border-end">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10">
          <div className="container">
            <div className="card shadow border-0 p-4 rounded-4">

              {/* HEADER */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold">My Skills</h3>
                <div>

                  <button
                    className="btn btn-primary rounded-pill px-4"
                    onClick={handleAdd}
                  >
                    + Add Skill
                  </button>
                </div>
              </div>

              {/* TABLE */}
              <table className="table table-striped table-bordered align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Sr</th>
                    <th>Icon</th>
                    <th>Skill Name</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {skills.length === 0 ? (
                    <tr>
                      <td colSpan={5}>
                        <p className="text-center">There are no skills.</p>
                      </td>
                    </tr>
                  ) : (
                    skills.map((skill, index) => {
                      const IconComponent =
                        FaIcons[skill.iconName] || SiIcons[skill.iconName];

                      return (
                        <tr key={skill.skillId}>
                          <td>{index + 1}</td>

                          <td>
                            {IconComponent ? (
                              <IconComponent size={35} />
                            ) : (
                              <span>—</span>
                            )}
                          </td>

                          <td className="fw-semibold">{skill.skillName}</td>

                          <td className="text-primary">
                            {skill.category?.categoryName}
                          </td>

                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary mx-1"
                              onClick={() => handleUpdate(skill)}
                            >
                              Update
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger mx-1"
                              onClick={() => handleDelete(skill.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>

      {/* ADD SKILL MODAL */}
      <AddSkillModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={saveNewSkill}
        categories={categories}
      />
    </div>
  );
}

export default ViewSkills;
