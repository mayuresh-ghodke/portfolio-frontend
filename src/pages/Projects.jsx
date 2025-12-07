import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { viewProjects } from "../services/public-service";
import "../styles/Projects.css";
import PublicProjectCard from "../components/PublicProjectCard";
import Loading from "../components/Loading";

function Projects() {

  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    viewProjects().then((res) => {
      setIsLoading(false);
      setProjects(res);
    });
    
  }, []);

  return (
    <div className="projects-container">
      <motion.h1
        className="projects-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mt-3 mb-5 content-title">Projects</h1>
      </motion.h1>

      <motion.div
        className="projects-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {isLoading ? <Loading /> : <>
          {projects.map((project, i) => (
          <PublicProjectCard project={project} key={i} />
        ))}
        </>}

        
      </motion.div>
    </div>
  );
}

export default Projects;
