import { motion } from "framer-motion";
import "../styles/PublicExperienceCard.css"; 
import { FaBriefcase, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

export default function PublicExperienceCard({ experience }) {

  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="exp-card"
    >

      {/* Role */}
      <h5 className="exp-title" style={{color:"#51f5f0ff"}}>
        <FaBriefcase size={24} className="exp-icon" /> 
        {experience.roleName}
      </h5>

      {/* Company */}
      <p className="exp-subtitle">
        <FaBuilding size={18} className="exp-icon" />
        {experience.companyName}
      </p>

      {/* Dates + Location */}
      <p className="exp-dates">
        <span className="exp-inline">
          <FaCalendarAlt size={17} className="exp-icon" />
          {formatDate(experience.startedIn)} → {formatDate(experience.endedOn)}
        </span>

        <span className="exp-divider">|</span>

        <span className="exp-inline">
          <MdLocationOn size={18} className="exp-icon" />
          {experience.location}
        </span>
      </p>

      {/* Job Type + Work Mode */}
      <p className="exp-jobType">
        {experience.jobType} 
        <span className="exp-divider">|</span> 
        {experience.workMode}
      </p>

      {/* Description */}
      <ul 
        className="exp-description" 
        dangerouslySetInnerHTML={{ __html: experience.description }}
      ></ul>

      {/* Hidden badge */}
      {experience.hidden && (
        <span className="tech-badge hidden-badge">
          Hidden
        </span>
      )}

    </motion.div>
  );
}
