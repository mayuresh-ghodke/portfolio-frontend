
import "../styles/ProjectCard.css";
import { FaGithub, FaTrash, FaEdit, FaEyeSlash, FaEye, FaExternalLinkAlt } from "react-icons/fa";
import { deleteProject } from "../services/admin-service.js";
import Swal from "sweetalert2";

function ProjectCard({ project, onToggle, onDelete, onEdit }) {

  const handleDeleteBtn = (projectId) => {
    deleteProject(projectId).then(()=>{
      Swal.fire({
        icon:'success',
        title: 'Project Deleted Successfully.',
        timer: 1500,
        showConfirmButton: false,
      });
      
    })
  }

  return (
    <div className="project-card shadow-sm">

      {/* Carousel */}
      <div id={`carousel-${project.projectId}`} className="carousel slide mb-3">
        <div className="carousel-inner">
          {project.images && project.images.length > 0 && (
        <div className="project-images">
          {project.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:8030${img}`}
              alt={`Project ${project.name} ${index + 1}`}
              className="project-img"
            />
          ))}
        </div>
      )}
        </div>

        {project.images.length > 1 && (
          <>
            <button className="carousel-control-prev" type="button"
              data-bs-target={`#carousel-${project.projectId}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button"
              data-bs-target={`#carousel-${project.projectId}`} data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </>
        )}
      </div>

      <h4 className="text-white">{project.name}</h4>
      <h6 className="text-muted">{project.subtitle}</h6>

      <p className="info" dangerouslySetInnerHTML={{ __html: project.info }}></p>

      <p><strong>Tech:</strong> {project.tech.join(", ")}</p>
      <p><strong>Duration:</strong> {project.startDate} - {project.endDate}</p>

      {/* ICON ACTIONS */}
      <div className="d-flex justify-content-between mt-3">
        <div className="icons-left">
          <FaGithub size={14} className="icon github" onClick={() => window.open(project.github)} />
          <FaExternalLinkAlt size={14} className="icon live" onClick={() => window.open(project.link)} />
        </div>

        <div className="icons-right">
          <FaEdit size={14} className="icon edit" onClick={onEdit} />
          <FaTrash size={14} className="icon delete" onClick={() => handleDeleteBtn(project.projectId)} />
          {project.hidden ? (
            <FaEye size={14} className="icon unhide" onClick={() => onToggle(project.projectId)} />
          ) : (
            <FaEyeSlash size={14} className="icon hide" onClick={() => onToggle(project.projectId)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
