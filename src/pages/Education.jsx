
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import {publicAxios, viewEducation} from "../services/public-service.js";

import "../styles/Education.css";
import { useEffect, useState } from "react";

function Education() {

  const [educations, setEducations] = useState([]);

  useEffect(()=>{
    viewEducation().then((res)=>{
      setEducations(res);
    });
  }, []);

  return (
    <div className="container">
      <div className="education-list ">
        {educations.map((edu)=>{
          return(
            <>
              <div className="edu-item">
                <h3 className="edu-degree">{edu.degreeName}</h3>
                <p className="edu-detail">{edu.schoolName} <span style={
                  {color:"#51f5f0ff"}
                }> • </span> {edu.place} <span style={
                  {color:"#51f5f0ff"}
                }> • </span> {edu.passingYear}</p>
              </div>
            </>
          );
        })}
      </div>

    </div>
  );
}

export default Education;
