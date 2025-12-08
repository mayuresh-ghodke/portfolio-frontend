import { motion } from "framer-motion";
import "../styles/PublicProjectCard.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function PublicProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="project-card"
    >
      {/* ⁠Title */}
      <h2 className="project-title">{project.name}</h2>

      {/* Subtitle */}
      <p className="project-subtitle">{project.subtitle}</p>

      <p><div className="project-links">
        {project.github && (
          <FaGithub size={18} className="icon" onClick={() => window.open(project.github)}> Github</FaGithub>
        )}
        {project.link && (
          <FaExternalLinkAlt size={18} className="icon" onClick={() => window.open(project.link)}> Link </FaExternalLinkAlt>
        )}
      </div></p>

        {/* Images */}
      {/* {project.images && project.images.length > 0 && (
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
      )} */}

      {/* Description */}
      <div
        className="project-description"
        dangerouslySetInnerHTML={{ __html: project.info }}
      ></div>

      {/* Tech Stack */}
      <div className="project-tech">
        {project.tech?.map((t, i) => (
          <span className="tech-badge" key={i}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
