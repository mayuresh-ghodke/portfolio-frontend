import React, { useState, useEffect } from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/ProfileSection.css";

import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";
import UpdateProjectModal from "./UpdateProjectModal";
import { viewProjects } from "../services/admin-service.js";

function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    viewProjects().then((data) => {
      setProjects(data)
    });
  }, []);

  const toggleHide = (id) => {
    setProjects(projects.map((p) =>
      p.projectId === id ? { ...p, hidden: !p.hidden } : p
    ));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.projectId !== id));
  };

  return (
    <div className="p-0 bg-light">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">
          <div className="container">
            <div className="card p-4 shadow">
              <h3 className="text-dark">Projects</h3>

              {projects.length === 0 ? (
                <h5 className="text-center text-muted py-5">
                  No projects uploaded yet.
                </h5>
              ) : (
                <div className="row mt-3">
                  {projects.map((project) => (
                    <div className="col-md-6 mb-4" key={project.projectId}>
                      <ProjectCard
                        project={project}
                        onToggle={toggleHide}
                        onDelete={deleteProject}
                        onEdit={() => setSelectedProject(project)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <UpdateProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSave={(updated) => {
            setProjects(
              projects.map((p) =>
                p.projectId === updated.projectId ? updated : p
              )
            );
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}

export default ViewProjects;
