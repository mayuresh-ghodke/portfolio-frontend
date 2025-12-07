import { useState, useEffect } from 'react';
import "../styles/view-skill.css";
import SkillCard from "../components/SkillCard.jsx";
import { viewSkills } from '../services/public-service.js'; 
import Loading from "../components/Loading";

import {
    FaHtml5, FaCss3Alt, FaBootstrap, FaJs, FaReact, FaJava,
    FaGitAlt, FaGithub, FaDocker
} from "react-icons/fa";

import {
    SiSpringboot, SiHibernate, SiMysql, SiPostman,
    SiJsonwebtokens
} from "react-icons/si";

import { TbApi } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import { SiJira } from 'react-icons/si';

const iconMap = {
    "java": FaJava,
    "springboot": SiSpringboot, // Matches the API data: "SpringBoot"
    "html5": FaHtml5,
    "css3": FaCss3Alt,
    "bootstrap": FaBootstrap,
    "javascript": FaJs,
    "reactjs": FaReact,
    "hibernate": SiHibernate,
    "spring security": MdSecurity,
    "jwt": SiJsonwebtokens,
    "rest api": TbApi,
    "git": FaGitAlt,
    "github": FaGithub,
    "docker": FaDocker,
    "postman": SiPostman,
    "mysql": SiMysql,
    "jira":SiJira,
    "unknown":FiAlertCircle
};

// --- Skills Component ---
function Skills() {

    const [skillsByCategory, setSkillsByCategory] = useState({});
    
    const [isLoading, setIsLoading] = useState(true);
    
    const [error, setError] = useState(null);

    // Function to fetch and process data
    useEffect(() => {
        const fetchAndGroupSkills = async () => {
            try {
                const skillsData = await viewSkills();
                setIsLoading(false);
                const processedSkills = skillsData.map(skill => {
                    const iconKey = (skill.iconName || '').toLowerCase();
                    const IconComponent = iconMap[iconKey] || iconMap['unknown']; // Fallback to null if icon not found

                    return {
                        id: skill.id,
                        skillName: skill.skillName,
                        categoryName: skill.category.categoryName,
                        icon: IconComponent, // The React Component
                    };
                });

                const groupedSkills = processedSkills.reduce((acc, skill) => {
                    const category = skill.categoryName;
                    
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(skill);
                    return acc;
                }, {});

                setSkillsByCategory(groupedSkills);
                
            } catch (err) {
                console.error("Error fetching skills data:", err);
                setError("Failed to load skills data. Please check the API connection.");
            }
        };

        fetchAndGroupSkills();
    }, []); 

    const categoryNames = Object.keys(skillsByCategory);

    // --- Render Component ---
    return (
        <div className="skills-container">
            <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="mt-1 mb-5 content-title">Technical Skills</h1>
          </div>
        </div>
            
            {isLoading ? <Loading /> : <>
                {categoryNames.length > 0 ? (
                categoryNames.map((categoryName) => (
                    <div className="skill-section" key={categoryName}>
                        {/* Use the categoryName as the section title */}
                        <h2 className="section-title">{categoryName}</h2>
                        <div className="skills-grid">
                            {/* Map over the skills array for this specific category */}
                            {skillsByCategory[categoryName].map(skill => (
                                // skill now contains { id, skillName, icon (React component) }
                                <SkillCard key={skill.id} skill={skill} />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No skills data available.</p>
            )}
            </>}
        </div>
    );
}

export default Skills;