import "../styles/view-skill.css";

function SkillCard({ skill }) {
  const IconComponent = skill.icon;

  return (
    <div className="skill-card">
      <IconComponent className="skill-icon" />
      <p className="skill-name">{skill.skillName}</p>
    </div>
  );
}


export default SkillCard;
